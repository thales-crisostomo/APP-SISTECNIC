import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, RefreshControl, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=refeicoesgeral&idunidade=1"

export default function QuadroRefeicao(props) {
  
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);
  const [dados, setDados] = useState([]);
  const [semDados, setSemDados] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@IdTurma').then((value) => {
      Refeicao(value)
    })
  }, []);

  const renderItem = ({item, index}) => (
    <View key={index} style={{borderBottomWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4 }}>
      <View style={{display: 'flex', width: '100%', padding: 5}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {item.txrefeicao == 'Sem dados' ? <Text style={{color: 'tomato'}}>{item.txrefeicao}</Text> : item.txrefeicao}
          </Text>
          <Text style={{fontSize: 20}}>
              {item.hrinicio ? item.hrinicio + '-' + item.hrfim : ''} 
          </Text>
          <View style={{width: '100%', padding: 10, justifyContent: 'flex-start', backgroundColor: 'white', margin: 10, borderRadius: 5, }}>
            {item.idsemana > 0 && item.idsemana < 6 && item.iddisciplina != 0 && item.iddisciplina != 9999? (
                <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2}}>
                    <Text style={{fontSize: 15}}>{item.idsemana == 1 ? 'Segunda-feira': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 2 ? 'Terça-feira': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 3 ? 'Quarta-feira': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 4 ? 'Quinta-feira': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 5 ? 'Sexta-feira': ''}</Text>
                </View>
            ) : <></> 
            }
          </View>
      </View>
    </View>
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
        }}
      />
    );
  };

  function Refeicao(idturma){
    axios.get(url).then(res => {
      console.log(res.data)
      if(res.data.dados){  
        var data = res.data.dados.sort((a, b) => a.hrinicio.localeCompare(b.hrinicio))
        data = res.data.dados.sort((a, b) =>  a.idsemana.toString().localeCompare(b.idsemana.toString()))
        setDados(data)
        setSemDados(false)
      }else{
        setDados([])
        setSemDados(true) 
      }
      setRefresh(false)
    });
  }

  function Reloading(){
      setRefresh(true)
      var idturma = AsyncStorage.getItem('@IdTurma').then((value) => {
        Refeicao(value)
      })
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'Quadro de refeicão'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
              <FlatList
                data={dados}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparator}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => Reloading()}
                    />
                }
              />
              {semDados && (
                <View style={{zIndex: 9999,justifyContent: 'center', paddingLeft: 10, paddingTop: 20, paddingBottom: 20, top: 200, position: 'absolute', width: '100%'}}>
                      <Text style={{fontSize: 20, color: '#9e9e9e', textAlign: 'center'}}>
                          Nenhum dado encontrado.
                      </Text>
                </View>
              )}
            </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({ 
    centeredView: {
        flex: 1,
        display: 'flex',
        width: '100%',
    },
});