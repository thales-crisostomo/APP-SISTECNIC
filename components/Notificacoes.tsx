import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, RefreshControl, View, SafeAreaView, TouchableHighlight} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

let idusuario = null

export default function Configuracoes(props) {
  const navigation = useNavigation();
  const [datatrue, setDataTrue] = useState('none');
  const [datafalse, setDataFalse] = useState('flex');
  const [dados, setDados] = useState([]);
  const [refresh, setRefresh] = useState(false);


  useFocusEffect( 
    React.useCallback(() => {
      AsyncStorage.getItem('@DadosUsuario')
      .then((value) => {
          value = JSON.parse(value)
          idusuario = value.idusuario
          Mural()
      });
    }, [])
  );

  const renderItem = ({item}) => (
    <TouchableOpacity activeOpacity={1} key={item.idagenda} style={{ borderWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 1, height: 1 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4, borderRadius: 10}}>
        <Text style={{color: '#32BF84', fontSize: 25, paddingBottom: 5}}>{item.nmusuario}</Text>
        <Text style={{fontSize: 20, paddingBottom: 5}}>{item.txnotificacao}</Text>
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

  function Mural(){
    axios.post('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-comunicacao.php?acao=notificacaoautorizado', {
        idusuario: idusuario,
    }).then(function(response){
        if(response.data.registro){
          setDataTrue('flex')
          setDataFalse('none')
          setDados(response.data.registro)
        }else{
          setDataTrue('none')
          setDataFalse('flex')
          setDados([])
        }
    });
  }

  function Reloading(){
      setRefresh(true)
      Mural()
  }

  return (
    <View>
      <Modal
        backdropColor={'#00B0FF'}
        backdropTransitionInTiming={500}
        isVisible={props.visible}
        style = {{padding: 0, margin: 0}}
        onBackButtonPress = {() => {
            props.Close()
         }}
        onModalWillHide={() => {
           props.Close()
        }}
      >
         <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: '#00B0FF'}}>
            <View style={styles.centeredView}> 
                <View style={{color: 'white', display: 'flex', flexDirection: 'row', paddingBottom: 5, padding: 10}}>
                    <View style={{flex: 2,  display: 'flex', justifyContent: 'center'}}>
                        {/*<Text style={{fontSize: 25, color: 'tomato', color: 'white', fontWeight: 'bold'}}>Olá, Thales</Text>*/}
                    </View>
                    <View style={{flex: 1, display:'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                        <TouchableHighlight style={{padding: 10, borderRadius: 1000, backgroundColor: 'rgba(255,255,255,0.3)'}} onPress={()=> props.Close()} activeOpacity={1} underlayColor="rgba(255,255,255,0.5)">
                           <AntDesign name="down" size={20} color="white" />
                        </TouchableHighlight>
                    </View>
                </View>
                <View
                    style={{padding: 10}}
                >
                    
                  <View style={{marginTop: '10%'}}/>
                  <View style={{height: 500, display: datafalse, alignItems: 'center', justifyContent: 'center'}}>
                    <LottieView
                        source={require("../assets/animation/nodata_2.json")}
                        loop={true}
                        autoPlay
                        style={{width: '70%', marginTop: '-20%'}}
                    /> 
                    <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginTop: 20}}>Nenhuma notificação.</Text>
                  </View>
                  <View style={{ display: datatrue}}>
                    <Text style={{fontSize: 25, textAlign: 'center', paddingBottom: 30, color: 'white'}}> Notificações </Text>
                    <FlatList
                      data={dados}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => item.idnotificacao.toString()}
                      ItemSeparatorComponent={renderSeparator}
                      refreshControl={
                          <RefreshControl
                              refreshing={refresh}
                              onRefresh={() => Reloading()}
                          />
                      }
                    />
                  </View>
                </View>
            </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1, 
        backgroundColor: '#00B0FF',
        padding: 10
      },
      container_1:{
        flex: 1,
        backgroundColor: 'transparent',
      },
      container_2:{
    
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
