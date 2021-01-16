import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, RefreshControl, FlatList, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const url = "http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=quadrodehorario&idturma="

export default function QuadroHorario(props) {
  
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);
  const [semAutorizados, setSemAutorizados] = useState(false);
  const [semDocumentos, setSemDocumentos] = useState(false);
  const [documentosAutorizados, setDocumentosAutorizados] = useState([]);
  const [dadosDocumentos, setDadosDocumentos] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
        DocumentosAutorizados(value.idusuario)
        SeusDocumentos(value.idusuario)
    });
  }, []);

  function Reloading() {
    setRefresh(true)
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
        DocumentosAutorizados(value.idusuario)
        SeusDocumentos(value.idusuario)
    });
  }

  function removeHtml(item){
    const regex = /(<([^>]+)>)/ig;
    var dados = null
    if(item.txdocumento){
      dados = item.txdocumento.replace(regex, '');
    }else{
      dados = <Text style={{color: 'tomato'}}>Documento sem texto.</Text>
    }
    return dados
  }

  function OpenLink(url){
    if(url){
        Linking.openURL(url) 
    }
  }

  const renderItem = ({item, index}) => (
    <View key={index} style={{borderBottomWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4 }}>
        <View style={{display: 'flex', width: '100%', padding: 5}}>
            <Text style={{fontSize: 20, color: '#8F8CE7', fontWeight: 'bold'}}>
                {item.nmdocumento}
            </Text>
            <Text style={{fontSize: 17, marginTop: 5}}>
                {item.nmagendatipo}
            </Text>
            <View style={{width: '100%', justifyContent: 'flex-start', backgroundColor: 'white', marginTop: 20, borderRadius: 5}}>
                <Text style={{fontSize: 15}}>{removeHtml(item)}</Text>
                <Text style={{color: '#00B0FF', fontSize: 15, marginTop: 10}} onPress={() => OpenLink(item.vlurldoc)}>{item.vlurldoc ? item.vlurldoc : ''}</Text>
          </View>
        </View>
    </View>
  );

  const renderItem_2 = ({item, index}) => (
    <View key={index} style={{borderBottomWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4 }}>
        <View style={{display: 'flex', width: '100%', padding: 5}}>
            <Text style={{fontSize: 20, color: '#8F8CE7', fontWeight: 'bold'}}>
                {item.nmdocumento}
            </Text>
            <Text style={{fontSize: 17, marginTop: 5}}>
                {item.nmagendatipo}
            </Text>
            <View style={{width: '100%', justifyContent: 'flex-start', backgroundColor: 'white', marginTop: 20, borderRadius: 5, }}>
                <Text style={{fontSize: 15}}>{removeHtml(item)}</Text>
                <Text style={{color: '#00B0FF', fontSize: 15, marginTop: 10}} onPress={() => OpenLink(item.vlurldoc)}>{item.vlurldoc ? item.vlurldoc : ''}</Text>
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

  function DocumentosAutorizados(idusuario){
    axios.post('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-comunicacao.php?acao=documentoautorizado', {
        idusuario: idusuario,
    }).then(function(response){
        //console.log(response.data)
        if(response.data.registro){
            setSemAutorizados(false)
            setDocumentosAutorizados(response.data.registro)
        }else{
            setSemAutorizados(true)
            setDocumentosAutorizados([])
        }
        setRefresh(false)
    });   
  }

  function SeusDocumentos(idusuario){
    axios.post('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-comunicacao.php?acao=documento', {
        idusuario: idusuario,
    }).then(function(response){
        console.log(response.data)
        if(response.data.registro){
            setSemDocumentos(false)
            setDadosDocumentos(response.data.registro)
        }else{
            setSemDocumentos(true)
            setDadosDocumentos([])
        }
        setRefresh(false)
    });   
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Header name={'Documentos'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
                <ScrollView contentContainerStyle={{}} refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => Reloading()}
                        />
                    }>
                    <View>
                        <Text style={{color: 'white', backgroundColor: '#009688', fontSize: 20, padding: 10, fontWeight: 'bold'}}>Documentos autorizados</Text>
                        <FlatList
                            data={documentosAutorizados}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={renderSeparator}
                            scrollEnabled={false}
                        />
                        {semAutorizados && (
                          <View style={{ padding: 20, width: '100%'}}>
                            <Text style={{fontSize: 20, color: '#9e9e9e'}}>
                                Nenhum dado encontrado.
                            </Text>
                          </View>
                        )}
                    </View>
                    <View>
                        <Text style={{color: 'white', fontSize: 20, padding: 10, backgroundColor: '#009688', fontWeight: 'bold'}}>Documentos criados</Text>
                        <FlatList
                            data={dadosDocumentos}
                            renderItem={renderItem_2}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={renderSeparator}
                            scrollEnabled={false}
                        />
                        {semDocumentos && (
                          <View style={{ padding: 20, width: '100%'}}>
                            <Text style={{fontSize: 20, color: '#9e9e9e'}}>
                                Nenhum dado encontrado.
                            </Text>
                          </View>
                        )}
                    </View>
                </ScrollView>
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