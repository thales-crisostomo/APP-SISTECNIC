import { StatusBar } from 'expo-status-bar';
import React, { useState,  } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Keyboard} from 'react-native';
import Login from './Login';
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';

export default function Starter({navigation}) {

  useFocusEffect( 
    React.useCallback(() => {
      RandomNumber()
    }, [])
  );
  
  var randomImages = [
    require('../assets/images/school_1.png'),
    require('../assets/images/school_2.png'),
    require('../assets/images/school_3.png'),
    require('../assets/images/school_4.png'),
    require('../assets/images/school_5.png'),
    require('../assets/images/school_6.png'),
  ];

  function RandomNumber(){  
    setImage(randomImages[Math.floor(Math.random() * 6)])
  }

  const [image,setImage] = useState(randomImages[Math.floor(Math.random() * 6)])
  const [modalLogin,setModalLogin] = useState(false)

  function onPressLearnMore () {
    setModalLogin(true)
  }

  function RecoverPassword(){
    Keyboard.dismiss()
    setModalLogin(false)
    var timer = setInterval(function() {
      navigation.navigate('RecoverPassword')
      clearInterval( timer );
    }, 400);
  }

  function Close() {
    setModalLogin(false)
    Keyboard.dismiss()
  }

  return (
    <>
      <Login visible={modalLogin} Close={() => Close()} RecoverPassword={() => RecoverPassword()}/>
      <View style={styles.container}>
        <StatusBar style="dark" hidden={false}/>
        <View style={styles.main}>
          <View style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.8)', height: '130%', width: '100%', zIndex: 9999999999}} />
          <Image source={require('../assets/images/logup.png')} style={{borderRadius: 0, position: 'absolute', resizeMode: 'contain', width: '50%', height: '50%', zIndex: 999999999999}}></Image>
          <Video
            source={require('../assets/videos/video-1.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping={true}
            style={{ width: '100%', height: '130%'}}
          />
        </View>
        <View style={styles.main_3}>
          <TouchableHighlight style={styles.entrar} activeOpacity={1} underlayColor="transparent" onPress={onPressLearnMore} accessibilityLabel="Entrar">
            <Text style={styles.txt_white_color}>Entrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: "flex",
  },
  main:{
    flex: 2, 
    display: "flex",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_2:{
    flex: 1, 
    display: "flex",
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  main_3:{
    flex: 1, 
    display: "flex",
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  entrar:{
    backgroundColor: '#00B0FF',
    borderRadius: 100,
    padding: 15,
    margin: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  registrar:{
    backgroundColor: 'transparent',
    borderRadius: 100,
    padding: 15,
    margin: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: 'gray',
    marginLeft: '40%'
  },
  img: {
    height: '100%',
    width: '100%',  
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0, 
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 40,
    color: '#00B0FF',
    fontWeight: 'bold'
  },
  sublogo: {
    fontSize: 20,
    color: 'gray',
  },
  txt_white_color: {
    color: 'white',
  },
  txt_gray_color: {
    color: '#00B0FF',
  }
});