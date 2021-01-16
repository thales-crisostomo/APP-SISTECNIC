import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableHighlight, RefreshControl, ScrollView, TouchableOpacity, Animated, FlatList, RefreshControlBase} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonContent from 'react-native-skeleton-content';
import axios from 'axios';
import Header from './Header';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome} from '@expo/vector-icons';

var token = null
var teste = false
let idturma = null

export default function Home(props) {

  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = React.useState(true);
  const [carterinha, setCarterinha] = useState();
  const [proxavaliacao, setProxAvaliacao] = useState();
  const [proximaaula, setProximaAula] = useState(null);
  const [proxrefeicao, setProxRefeicao] = useState();
  const [proxtarefa, setProxTarefa] = useState();
  const [periodo, setPeriodo] = useState(String);
  const [dados, setDados] = useState([{id: 1, nmnome: 'thales'}]);
  const [semDados, setSemDados] = useState(false);
  const widthMenu = useRef(new Animated.Value(-600)).current;

  useFocusEffect( 
      
    React.useCallback(() => {
        /*
        AsyncStorage.getItem('@DadosUsuario')
        .then((value) => {
            value = JSON.parse(value)
            DadosMatricula(value.idusuario)
            Carterinha(value)
            //setLoading(true)
            //setRefreshing(true)
        });
        */
    }, [])
    
  );

  useEffect(() => {
    
    AsyncStorage.getItem('@DadosUsuario')
    .then((value) => {
        value = JSON.parse(value)
        //console.log(value)
    });
    AsyncStorage.getItem('@Token')
    .then((value) => { 
        value = JSON.parse(value)
        //console.log(value)
        Veiculos(value.toString())
    });
  }, []);

 async  function Veiculos(token: string){
    console.log(token)
    /*
    const headers = { Authorization: `${token}` };
    axios.get('http://s.sistecnic.com.br/api/view/Veiculo/retornarVeiculosPorVeiculoClienteSubcliente', {
       headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": token
        } 
    }).then(res => { 
        console.log(res.data)
        if(res.data.accessToken){  
            //Sucess(res.data) 
            return          
        } 
        else  
        {
            return Error()
        }
    });\
    */
}


  const renderItem = ({item, index}) => (
    <View key={index} style={{borderBottomWidth: 0.5, borderColor: '#f5f5f5', padding: 12, backgroundColor: 'white' , shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2, marginTop: 4, marginBottom: 4 }}>
      <View style={{display: 'flex', width: '100%', padding: 5}}>
          <View style={{width: '100%', padding: 10, justifyContent: 'flex-start', backgroundColor: 'white', margin: 10, borderRadius: 5, }}>
            <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', shadowColor: "rgba(0,0,0,0.3)", shadowOffset: {width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, elevation: 2}}>
                <Text style={{fontSize: 15}}>{item.nmemail}</Text>
            </View>
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
  
  function LoadingShow() {
    setLoading(true)
    setRefreshing(true);
  }

  function Reloading(){
    LoadingShow()
    setRefreshing(true);
  }
  function CloseMenu() {
    Animated.timing(widthMenu, {
        toValue: -600,
        duration: 300,
        useNativeDriver: false
    }).start();
  }

  function OpenMenu(){
    Animated.timing(widthMenu, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
    }).start();
  }

 

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <Animated.View style={{width: '90%', backgroundColor: ('rgba(0,0,0,0.5'), marginLeft: widthMenu, height: '100%', position: 'absolute', zIndex: 999999999, shadowColor: '#000000', shadowOpacity: 0.8, elevation: 5, shadowRadius: 100}}>
            <View style={{flex: 1,  zIndex: 9999}}>
                <SafeAreaView style={{
                    width: '100%', 
                    backgroundColor: '#00B0FF',
                    alignItems: 'flex-end',
                }}>
                    <View style={{padding: 16}}>
                        <TouchableOpacity style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 40, height: 40, borderRadius: 40, marginRight: 10, marginTop: '10%', justifyContent: 'center', alignItems: 'center'}} onPress={() => CloseMenu()}>
                            <MaterialIcons name="close" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <ScrollView scrollEnabled={false} showsVerticalScrollIndicator = {false}  style={{flex: 1, backgroundColor: 'white'}} contentInset = {{bottom: 100}}>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Carteirinha'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Carteirinha</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="idcard" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('QuadroHorario'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Quadro de horário</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="clockcircleo" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('QuadroProva'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Quadro de prova</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="book" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('QuadroRefeicao'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Quadro de refeição</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="food-apple-outline" size={28} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Notas'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Notas</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="profile" size={28} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Mural'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Mural</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="pushpino" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     {/*
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Carteirinha'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Notificações</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="notification" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                      */}
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Rotas'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Rota do transporte</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="enviromento" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Documentos'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Documentos</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="file1" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Qrcode'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>QRcode</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="qrcode" size={25} color="black" />
                        </View>
                     </TouchableOpacity>
                     
                     <TouchableOpacity style={{width: '100%', borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#eeeeee', flexDirection: 'row'}} onPress={()=> {navigation.navigate('Starter'), CloseMenu()}}>
                        <View style={{flex: 5, padding: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 20}}>Sair</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="logout" size={25} color="tomato" />
                        </View>
                     </TouchableOpacity>
                </ScrollView>
            </View>
        </Animated.View>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#343837', paddingTop: '7%'}}>
            <Header name={'Sistecnic'} icon1={<Feather name="menu" size={25} color="white" />} icon2={''} colorText={'white'} color='#343837' onPress1={() => OpenMenu()} />
            <View style={styles.centeredView}>
                <View style={{flex: 1, width: '100%'}}>
                    <FlatList
                        data={dados}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={renderSeparator}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
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
            </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({ 
    centeredView: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    container_1:{
        flex: 1,
        backgroundColor: 'transparent',
    },
    container_2:{

    },
    login: {
        marginTop: '10%',
        padding: 16,
        backgroundColor: '#00B0FF',
        width: '90%',
        borderRadius: 100,
    },
    txt_white_color: {
        color: 'white',
        textAlign: 'center',
    },
    checkboxInput: {
        flexDirection: "row",
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'flex-start'
    },
});