import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, RefreshControl, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-notas.php?acao=notasdoaluno"

export default function Notas(props) {

  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);
  const [dados, setDados] = useState([]);
  const [semDados, setSemDados] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@IdTurma').then((value) => {
        AsyncStorage.getItem('@DadosUsuario').then((res) => {
            var resultado = JSON.parse(res)
            Notas(value, resultado.idusuario)
        })
    })
  }, []);

  const renderItem = ({item, index}) => (
    <View key={index} style={{borderBottomWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4 }}>
      <View style={{display: 'flex', width: '100%', padding: 5}}>
          <Text style={{fontSize: 20}}>
              {item[0]}° bimestre
          </Text>
          <View style={{width: '100%', padding: 10, justifyContent: 'flex-start', backgroundColor: 'white', margin: 10, borderRadius: 5, }}>
            <>
            {item.map((item, key) => {
              return(
                item.nrnota > 0 || item.nrnota2 > 0 || item.nrnota3 > 0 || item.nrnota4 > 0 ? (
                  <View key={key} style={{backgroundColor: 'white', padding: 10, shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 10}}>
                    <Text style={{color: '#00B0FF', fontSize: 20}}>Disciplina: {item.nmdisciplina}</Text>
                    <Text style={{color: '#BE03FD', fontSize: 20}}>Professor(a): {item.nmusuario}</Text>
                    
                    <View style={{marginTop: 10}}>
                        {item.nrnota ? <Text style={{fontSize: 17, fontWeight: 'bold'}}>1° Avaliação: {item.nrnota}</Text> : <></> }
                        {item.nrnota ? <Text style={{fontSize: 17, fontWeight: 'bold'}}>2° Avaliação: {item.nrnota2}</Text> : <></> }
                        {item.nrnota ? <Text style={{fontSize: 17, fontWeight: 'bold'}}>3° Avaliação: {item.nrnota3}</Text> : <></> }
                        {item.nrnota ? <Text style={{fontSize: 17, fontWeight: 'bold'}}>4° Avaliação: {item.nrnota4}</Text> : <></> }
                    </View>
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

  function Notas(idturma, idusuario){
    axios.get(url + '&idaluno=' + idusuario + '&idunidade=1').then(res => {
      if(res.data.listanotas.length > 0){  
        var result = []
        
        var data = res.data.listanotas.sort((a, b) => a.nrtpavaliacao.localeCompare(b.nrtpavaliacao))
        var tem = false 

        for(var i = 0; i < data.length; i++){
          var nrtpavaliacao = data[i].nrtpavaliacao
          for(var h = 0; h < result.length; h++){
            if(result[h] == nrtpavaliacao){
              tem = true
            } 
          }
          if(tem == false){
            result.push([nrtpavaliacao])
          }
          tem = false
        } 

        for(var i = 0; i <  result.length; i++){
          for(var j = 0; j < data.length; j++){
            if(result[i][0] == data[j].nrtpavaliacao){
              result[i].push(data[j])
            }
          }
        }

        setDados(result)
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
    AsyncStorage.getItem('@IdTurma').then((value) => {
        AsyncStorage.getItem('@DadosUsuario').then((res) => {
            var resultado = JSON.parse(res)
            Notas(value, resultado.idusuario)
        })
    })
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'Notas'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
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