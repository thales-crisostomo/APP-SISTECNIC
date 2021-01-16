import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions, Button, Linking, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from 'react-native-modal';


export default function QRcode(props) {
  
  const navigation = useNavigation();
  const [dados, setDados] = useState({});
  const [leitor, setLeitor] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
        console.log(value)
        setDados(value)
    });
  }, []);

  function LerQrcode(){
    
    setLeitor(true)
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      "Deseja abrir o link abaixo?",
      data,
      [
        {
          text: "Não",
          onPress: () => setScanned(false),
          style: "cancel"
        },
        { text: "Abrir", onPress: () => {
            Linking.openURL(data), 
            setScanned(false)
            setTimeout(function(){
                setLeitor(false)
                setScanned(false)
            }, 500);
        }}
      ],
      { cancelable: false }
    );
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'QRcode'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={<AntDesign name="camerao" size={24} color="white" />} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} onPress2={() => LerQrcode()} />
            <View style={styles.centeredView}>
                <ScrollView contentContainerStyle={{paddingTop: '5%',}}>
                    <View style={{flex: 1, display: 'flex', width: '100%', padding: 5}}>
                        <Text style={{fontSize: 25, textAlign: 'center'}}>{dados.nmusuario}</Text>
                    </View>
                    <View style={{paddingTop: '10%', height: 400}}>
                        <Image source={{uri: 'http://dmctec.virtuaserver.com.br/assets/images/qrcode/' + dados.vlalunoimg3}} style={{height: '100%', width: '100%', resizeMode: 'contain', borderRadius: 5}}/>
                    </View>

                    
                    
                </ScrollView>
            </View>
            <Modal
                backdropColor={'rgba(0,0,0,0.5)'}
                backdropTransitionInTiming={500}
                isVisible={leitor}
                style = {{padding: 0, margin: 0}}
                onBackButtonPress = {() => {
                    setLeitor(false)
                }}
                onModalWillHide={() => {
                    setLeitor(false)
                }}
            >   
                <View style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
                    <StatusBar style="light" hidden={false}/>
                    
                    <View style={styles.centeredView}> 
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        >   

                        <View style={{color: 'white', display: 'flex', flexDirection: 'row', paddingBottom: 5, padding: 10}}>
                            <View style={{flex: 2,  display: 'flex', justifyContent: 'center'}}>
                                {/*<Text style={{fontSize: 25, color: 'tomato', color: 'white', fontWeight: 'bold'}}>Olá, Thales</Text>*/}
                            </View>
                            <View style={{flex: 1, display:'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '15%', paddingRight: 10}}>
                                <TouchableOpacity style={{padding: 10, borderRadius: 1000, backgroundColor: 'rgba(255,255,255,0.3)'}} onPress={()=> setLeitor(false)} activeOpacity={1} >
                                    <AntDesign name="close" size={20} color="white" />
                                </TouchableOpacity>
                            </View>

                         </View>
                            
                        </BarCodeScanner>
                        {/*{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}*/}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({ 
    centeredView: {
        flex: 1,
        width: '100%'
    },
});