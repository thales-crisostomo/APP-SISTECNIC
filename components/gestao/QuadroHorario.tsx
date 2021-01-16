import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, RefreshControl, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=quadrodehorario&idturma="

export default function QuadroHorario(props) {
  
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);
  const [dados, setDados] = useState([]);
  const [semDados, setSemDados] = useState(false);

  useEffect(() => {
    setRefresh(true)
    var idturma = AsyncStorage.getItem('@IdTurma').then((value) => {
      Horarios(value)
    })
  }, []);

  const renderItem = ({item, index}) => (
    <View key={index} key={item.nmturma} style={{borderBottomWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4 }}>
      <View style={{display: 'flex', width: '100%', padding: 5}}>
          <Text style={{fontSize: 20}}>
              {item[0]}
          </Text>
          <View style={{width: '100%', padding: 10, justifyContent: 'flex-start', backgroundColor: 'white', margin: 10, borderRadius: 5, }}>
            <>
            {item.map((item, key) => {
              return(
                item.idsemana > 0 && item.idsemana < 6 ? (
                  <View key={key} style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2}}>
                    <Text style={{fontSize: 15}}>{item.idsemana == 1 ? 'Segunda - ': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 2 ? 'Terça - ': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 3 ? 'Quarta - ': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 4 ? 'Quinta - ': ''}</Text>
                    <Text style={{fontSize: 15}}>{item.idsemana == 5 ? 'Sexta - ': ''}</Text>
                    <Text style={{color: '#00B0FF', fontSize: 15}}>{item.iddisciplina === 9998 ? <Text style={{color: '#BE03FD', fontSize: 15}}>Intervalo</Text> : item.nmdisciplina ? item.nmdisciplina : <Text style={{color: 'tomato', fontSize: 15}}>Não confirmado</Text>}</Text>
                  </View>
                ) : <></> 
              )
            })}
            </>
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

  function Horarios(idturma){
    axios.get(url + idturma).then(res => {
      console.log(res.data)
      if(res.data.horarios.length > 0){  
        var result = []
        var data = res.data.horarios.sort((a, b) => a.hrinicio.localeCompare(b.hrinicio))
        var data = res.data.horarios.sort((a, b) =>  a.idsemana.toString().localeCompare(b.idsemana.toString()))
        var tem = false
        console.log(data)
        for(var i = 0; i < data.length; i++){
          var horario = data[i].hrinicio
          var fim = data[i].hrfim
          for(var h = 0; h < result.length; h++){
            if(result[h] == horario){
              tem = true
            } 
          }
          if(tem == false){
            result.push([horario])
          }
          tem = false
        } 

        for(var i = 0; i <  result.length; i++){
          for(var j = 0; j < data.length; j++){
            if(result[i][0] == data[j].hrinicio){
              result[i].push(data[j])
            }
          }
        }
       
        setDados(result)
        setSemDados(false)   
      } else{
        setDados([])
        setSemDados(true) 
      }
      setRefresh(false)
    });
  }

  function Reloading(){
      setRefresh(true)
      var idturma = AsyncStorage.getItem('@IdTurma').then((value) => {
        Horarios(value)
      })
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Header name={'Quadro de horário'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
              <FlatList
                data={dados}
                style={{minHeight: 100}}
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
                <View style={{ zIndex: 9999,justifyContent: 'center', paddingLeft: 10, paddingTop: 20, paddingBottom: 20, top: 200, position: 'absolute', width: '100%'}}>
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
    },
});