import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, Dimensions, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
import { FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Alunos(props) {
  
  const navigation = useNavigation();
  const [dados, setDados] = useState({});
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
        console.log(value)
        setDados(value)
    });
  }, []);

  function ajustData(data){
    if(data){
        var dia = data.split('-')[2].split(' ')[0]
        var mes = data.split('-')[1].split(' ')[0]
        var ano = data.split('-')[0].split(' ')[0]
        var data = dia + '/' + mes + '/' + ano
        return data
    }else{
        return 'Sem dados'
    }
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'Carteirinha'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
                <View style={{flex: 1, width: '100%', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: windowHeight/1.3, backgroundColor: 'rgb(38, 41, 51)', padding: 5, borderRadius: 10, height: windowWidth/1.2, transform: [{ rotate: '90deg'}]}}>
                            <View style={{position: "absolute", right: 10, top: 10}}>
                                <Image source={{uri: 'http://dmctec.virtuaserver.com.br/assets/images/secretaria/' + dados.vllogoimg}} style={{width: 40, height: 40 , resizeMode: 'cover', borderRadius: 5}} />
                            </View>
                            <View style={{flex: 1.5, padding: 5, flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={{uri: 'http://dmctec.virtuaserver.com.br/assets/images/perfil/' + (!dados.vlalunoimg ? 'padrao-user.png' : dados.vlalunoimg)}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 5}} />
                                </View>
                                <View style={{flex: 3, padding: 10}}>
                                    <Text numberOfLines={1} style={{fontSize: 25, color: 'white'}}>{dados.nmusuario}</Text>
                                    <Text style={{fontSize: 20, color: '#FFD54F'}}>Estudante</Text>
                                    <Text style={{fontSize: 20, color: '#808080'}}><Text style={{color: 'white'}}>NASC:</Text> {ajustData(dados.dtnascimento)}</Text>
                                    <Text style={{fontSize: 20, color: '#808080'}}><Text style={{color: 'white'}}>MAT:</Text> {!dados.cdmatricula ? 'Sem dados' : dados.cdmatricula}</Text>
                                    <Text style={{fontSize: 20, color: '#808080'}}><Text style={{color: 'white'}}>CPF:</Text> {!dados.nrcpf ? 'Sem dados' : dados.nrcpf}</Text>
                                    <Text style={{fontSize: 20, color: '#808080'}}><Text style={{color: 'white'}}>E-MAIL:</Text> {!dados.nmemail ? 'Sem dados' : dados.nmemail}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, padding: 5, flexDirection: 'row'}}>
                                <View style={{flex: 3, padding: 5, justifyContent: 'center'}}>
                                    <Text numberOfLines={1} style={{color: '#FFD54F', fontSize: 20}}>
                                        {dados.nmsecretaria}
                                    </Text>
                                    <Text numberOfLines={1} style={{color: 'white', fontSize: 20}}>
                                        {dados.nmunidade}
                                    </Text>
                                </View>
                                <View style={{flex: 0.6, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '6%'}}>
                                    <Image source={{uri: 'http://dmctec.virtuaserver.com.br/assets/images/qrcode/' + dados.vlalunoimg3}} style={{height: '100%', width: '100%', resizeMode: 'contain', borderRadius: 5}}/>
                                </View>
                            </View>
                        </View>
                </View>
            </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({ 
    centeredView: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
});