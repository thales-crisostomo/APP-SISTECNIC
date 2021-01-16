import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Keyboard, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const url = "http://s.sistecnic.com.br/api/view/Usuario/verificarUsuarioSenha"

export default function Starter(props) {
  const navigation = useNavigation();
  const loadingAnimation = useRef(null);
  
  function Login () {
    setFlexAuto(1);
    Keyboard.dismiss();
    
    if(!user || !password){
      Alert.alert(
          "Ops!",
          "Você deve preencher os dois campos.",
          [
            { text: "OK" }
          ],
          { cancelable: false }
      );
      return
    }

    setLoading(true);
    setConteudo(false);
    /*
    axios.post(url, {
      usuario: 'sistecnic',
      senha: 'sis4512'
    }).then(res => {
      if(res.data.accessToken){  
          Sucess(res.data) 
          return         
      } 
      else 
      {
          return Error()
      }
    });
    */
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZHVzdWFyaW8iOjEsImlkZW1wcmVzYSI6MSwiaWRjbGllbnRlIjpudWxsLCJubXVzdWFyaW8iOiJTaXN0ZWNuaWMgQWRtaW4iLCJubWxvZ2luIjoic2lzdGVjbmljIiwibm1lbWFpbCI6ImNvbWVyY2lhbEBzaXN0ZWNuaWMuY29tLmJyIiwiaWRtYXRyaXoiOm51bGx9.qanBlfd4ewV-sB-uHAiSgn6aHIHAjUQLRjjJe5QRv5o'
  const api = `http://s.sistecnic.com.br/api/view/Veiculo/retornarVeiculosPorVeiculoClienteSubcliente`
  axios.get(api, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    }) 
    .then(res => {
        console.log(res.data);
    })

    setLoading(false);
    setConteudo(true);
  }

  async function Sucess(data){
    props.Close()
    setLoading(false);
    setConteudo(true);
    setFlexAuto(1);
    await AsyncStorage.setItem('@Email', data.nmemail);
    await AsyncStorage.setItem('@DadosUsuario', JSON.stringify(data))
    await AsyncStorage.setItem('@Token', JSON.stringify(data.accessToken))
    var timer = setInterval(function() {
      navigation.navigate('Home')
      clearInterval( timer);
    }, 300);
    
  }

  function Error(){
    setLoading(false);
    setConteudo(true);
    setFlexAuto(1);
    Alert.alert(
      "Ops!",
      "Usuário e/ou senha inválidos.",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(false);
  const [password, setPassword] = useState(false);
  const [flexAuto, setFlexAuto] = useState(1);
  const [loading, setLoading] = useState(false);
  const [conteudo, setConteudo] = useState(true);
  
  return (
    <View>
      <Modal
        backdropColor={'#00B0FF'}
        backdropTransitionInTiming={500}
        isVisible={props.visible}
        style = {{padding: 0, margin: 0}}
        onBackButtonPress = {() => {
            props.Close
         }}
        onModalWillHide={() => {
           props.Close
        }}
        swipeThreshold ={200}
        onSwipeStart = {() => Keyboard.dismiss()}
        onSwipeComplete = {props.close}
        swipeDirection = {['down']}
      >
        <View style={styles.centeredView}>
          <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={styles.container_1} onPress={() => props.Close()}>
            <View />
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={1} underlayColor="white" style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            flex: flexAuto,
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10}} onPress={() => Keyboard.dismiss()}>
            <TouchableHighlight style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <View style={{ padding: 10, width: '100%', height: '100%'}}>
                {conteudo && (
                  <View style={{padding: 15}}>
                    <Sae 
                      autoFocus
                      onFocus={() => setFlexAuto(3)}
                      labelStyle={{ color: '#00B0FF', margin: 10}}
                      label = { 'E-mail' } 
                      iconSize= {0}
                      iconClass = { FontAwesomeIcon } 
                      iconName = { 'car' } 
                      iconColor = { '#00B0FF' } 
                      inputPadding = { 6 } 
                      labelHeight = { 20 } 
                      inputStyle= {{marginLeft: 10, color: 'black'}}
                      style={{width: '100%', backgroundColor: '#fafafa', borderRadius: 4, textTransform: 'lowercase'}}
                      // altura da borda ativa 
                      borderHeight = { 2 } 
                      // TextInput props 
                      autoCapitalize = { 'none' }
                      autoCorrect = { true } 
                      keyboardType={"email-address"}
                      onChangeText={(text) => {setUser(text)}}
                    /> 
                     <View style={{paddingTop: '2%'}}/>
                    <Sae 
                      labelStyle={{ color: '#00B0FF', margin: 10}}
                      label = { 'Senha' } 
                      onFocus={() => setFlexAuto(3)}
                      iconClass = { FontAwesomeIcon } 
                      iconName = { 'car' } 
                      iconColor = { '#00B0FF' } 
                      iconSize ={0}
                      inputPadding = { 6 } 
                      labelHeight = { 20 } 
                      inputStyle= {{marginLeft: 10, color: 'black'}}
                      style={{width: '100%', backgroundColor: '#fafafa', borderRadius: 4}}
                      // altura da borda ativa 
                      borderHeight = { 2 } 
                      // TextInput props 
                      secureTextEntry={true}
                      autoCapitalize = { 'none' }
                      autoCorrect = { true } 
                      onChangeText={(text) => {setPassword(text)}}
                    /> 
                    <View style={{paddingTop: '10%'}}/>
                    <TouchableHighlight underlayColor={'white'} style={{
                      width: '100%',
                      backgroundColor: '#00B0FF',
                      padding: 10,
                      borderRadius: 100,
                    }} onPress={() => Login()}>
                      <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}> Entrar</Text>
                    </TouchableHighlight>

                  </View>
                )}
                {loading && (
                  <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <View style={{marginBottom: '30%'}}>
                      <ActivityIndicator size="large" color="#00B0FF" />
                    </View>
                  </View>
                )}
              </View>
            </TouchableHighlight>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 0,
        backgroundColor: 'transparent'
      },
      container_1:{
        flex: 1,
        backgroundColor: 'transparent',
      },
     
      login: {
        padding: 16,
        backgroundColor: '#00B0FF',
        width: '90%',
        borderRadius: 100,
      },
      txt_white_color: {
        color: 'white',
        textAlign: 'center',
      },
      txt_forget: {
        textAlign: 'center',
        textDecorationLine: 'underline'
      }
});



/*

    <Sae 
                        autoFocus
                        onFocus={() => setFlexAuto(3)}
                        labelStyle={{ color: '#00B0FF', margin: 10}}
                        label = { 'E-mail' } 
                        iconSize= {0}
                        iconClass = { FontAwesomeIcon } 
                        iconName = { 'envelope-o' } 
                        iconColor = { '#00B0FF' } 
                        inputPadding = { 6 } 
                        labelHeight = { 20 } 
                        inputStyle= {{marginLeft: 10, color: 'black'}}
                        style={{width: '90%', backgroundColor: '#fafafa', borderRadius: 4, textTransform: 'lowercase'}}
                        // altura da borda ativa 
                        borderHeight = { 2 } 
                        // TextInput props 
                        autoCapitalize = { 'none' }
                        autoCorrect = { true } 
                        keyboardType={"email-address"}
                        onChangeText={(text) => {setUser(text)}}
                      /> 
                      
                      <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <TouchableOpacity style={{
                          width: '90%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#00B0FF',
                          height: 50,
                          borderRadius: 100,
                          elevation: 2
                        }} onPress={() => alert('dsadsa')}>
                          <Text style={{fontSize: 20, color: 'white'}}> Entrar</Text>
                        </TouchableOpacity>
                      </View>


*/