import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const url = "http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-usuario.php"

export default function Register(props) {
  
  const navigation = useNavigation();

  useEffect(() => {
      /*
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
    });
    */

    axios.get(url + "?acao=logar&email="+user.toLowerCase().trim()+"&senha=" + password.trim()).then(res => {
        if(res.data.success === true){  
            Sucess(res.data) 
            return         
        } 
        else 
        {
            return Error()
        }
    });


  }, []);

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'Alunos'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
                <View style={{flex: 1, display: 'flex', width: '100%'}}>
                    <ScrollView
                        contentContainerStyle={{}}
                        showsVerticalScrollIndicator={false}>
                        <View style={{flexDirection: 'column'}}>

                            
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({ 
    centeredView: {
        flex: 1,
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        width: '100%',
    },
    container_1:{
        flex: 1,
        backgroundColor: 'transparent',
    },
    container_2:{

    },
});