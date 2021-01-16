import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, FlatList, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

let idusuario = null

export default function Mural(props) { 
  
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);
  const [dados, setDados] = useState([]);
  const [modalDados, setModalDados] = useState(false);
  const [semDados, setSemDados] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
        idusuario = value.idusuario
        Mural(idusuario)
    });
    
  }, []);

  function OpenLink(url){
    if(url){
        Linking.openURL(url) 
    }
  }

  function dtinicio(data){
    var dia = data.split('-')[2].split(' ')[0]
    var mes = data.split('-')[1].split(' ')[0]
    var ano = data.split('-')[0].split(' ')[0]
    var data = dia + '/' + mes + '/' + ano
    return data
  }

  function dtfinal(data){
    var dia = data.split('-')[2].split(' ')[0]
    var mes = data.split('-')[1].split(' ')[0]
    var ano = data.split('-')[0].split(' ')[0]
    var data = dia + '/' + mes + '/' + ano
    return data
  }

  function removeHtml(item){
    const regex = /(<([^>]+)>)/ig;
    var dados = null
    if(item.txagenda){
      dados = item.txagenda.replace(regex, '');
    }else{
      dados = 'Nem um texto'
    }
    return dados
  }

  const renderItem = ({item, index}) => (
    <TouchableOpacity activeOpacity={1} key={index} style={{ borderWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 1, height: 1 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4, marginLeft: 5, marginRight: 5, borderRadius: 10}} onPress={() => detalhesMural(item)}>
        <Text style={{paddingBottom: 5, fontSize: 20, color: '#00B0FF'}}>{item.nmagenda}</Text>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
              <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Início:</Text> {dtinicio(item.dtinicio)}</Text>
            </View>
            <View style={{flex: 1,  paddingTop: 10, paddingBottom: 10}}>
               <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Término:</Text> {dtfinal(item.dtfim)}</Text>
            </View>
        </View>
        <Text style={{paddingTop: 5, paddingBottom: 5, fontSize: 17}}>{removeHtml(item)}</Text>
        {item.links.map((item, key) => {
          return(
          <View key={key}>
            <Text style={{height: 2, backgroundColor: '#eeeeee', width: '100%'}}></Text>
          </View>
          )
        })}
        <>
          {item.links.map((item, key) => {
            return(
              item.vlurl ? (
                <View style={{marginTop: 10, marginBottom: 10}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.nmagendaarquivo}</Text>
                  <Text style={{fontSize: 15, color: '#00B0FF'}} onPress={() => OpenLink(item.vlurl)}>{item.vlurl}</Text>
                </View>
              ) : <></>
            )
          })}
        </>
    </TouchableOpacity>
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

  function Arquivos(data){
    console.log(data)
    axios.get('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-agenda.php?acao=arquivo&idunidade=1').then(function(res){
        setRefresh(false)
        if(res.data.registro){
          for(var i = 0; i < data.length; i++){
            var link = []
            for(var j = 0; j < res.data.registro.length; j++){
              if(res.data.registro[j].idagenda == data[i].idagenda){
                link.push(res.data.registro[j])
              }
            }
            data[i].links = link
          }
          console.log(data)
          setDados(data)
        }else{
          setDados(data)
        }
    })
  }

  async function Mural(idusuario){
    axios.get('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-agenda.php?acao=agendamural&idusuario='+idusuario+'&idagendatipo=1').then(function(res){
      if(res.data.registro){
          setSemDados(false)
          Arquivos(res.data.registro)
      }else{
        setSemDados(true)
        setDados([])
      }
    });
  }

  function Reloading(){
      setRefresh(true)
      AsyncStorage.getItem('@DadosUsuario')
      .then((value) => {
        value = JSON.parse(value)
        idusuario = value.idusuario
        Mural(idusuario)
      });
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'Mural'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
                <FlatList
                    data={dados}
                    renderItem={renderItem}
                    style={{zIndex: 99999}}
                    keyExtractor={(item, index) => item.idagenda.toString()}
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
            <Modal
                backdropColor={'rgba(0,0,0,0.5)'}
                backdropTransitionInTiming={500}
                isVisible={modalDados}
                style = {{padding: 0, margin: 0}}
                onBackButtonPress = {() => {
                    setModalDados(false)
                }}
                onModalWillHide={() => {
                    setModalDados(false)
                }}
            >   
                <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
                    <StatusBar style="dark" hidden={false}/>
                    <View style={styles.centeredView}> 
                        <View style={{color: 'white', display: 'flex', flexDirection: 'row', paddingBottom: 5, padding: 10}}>
                            <View style={{flex: 2,  display: 'flex', justifyContent: 'center'}}>
                                {/*<Text style={{fontSize: 25, color: 'tomato', color: 'white', fontWeight: 'bold'}}>Olá, Thales</Text>*/}
                            </View>
                            <View style={{flex: 1, display:'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <TouchableOpacity style={{padding: 10, borderRadius: 1000, backgroundColor: 'rgba(0,0,0,0.3)'}} onPress={()=> setModalDados(false)} activeOpacity={1} >
                                    <AntDesign name="down" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView
                            contentContainerStyle={{padding: 10}}
                            showsVerticalScrollIndicator={false}
                        >
                        <View style={{marginTop: '10%'}}/>
                        
                        
                        
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({ 
    centeredView: {
        flex: 1,
        padding: 10,
    },
});