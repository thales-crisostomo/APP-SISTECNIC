import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View,  SafeAreaView, Dimensions, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const LATITUD_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUD_DELTA + (Dimensions.get('window').width / Dimensions.get('window').height)

export default function Unidades(props) {
  const mapRef = useRef();
  const navigation = useNavigation();
  const [position, setPosition] = useState({latitude: -22.9035, longitude: -43.2096});
  const [veiculo, setVeiculo] = useState({placa: '', veiculo: ''});
  const [initial, setInitial] = useState({})
  const [time, setTime] = React.useState(0);

  useEffect(() => {
    Rota()
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 3);
      Rota()
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);
  
  
  function Rota(){
    axios.get('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-monitorar.php?acao=monitorar&idunidade=1').then(({data}) => {
        if(data.monitorar){
            setPosition({latitude: parseFloat(data.monitorar[0].vllatitude), longitude: parseFloat(data.monitorar[0].vllongitude)})
            setInitial(
                {latitude: parseFloat(data.monitorar[0].vllatitude), longitude: parseFloat(data.monitorar[0].vllongitude),
                latitudeDelta: 0.006,
                longitudeDelta: 0.001})
            setVeiculo({placa: data.monitorar[0].nrplaca, veiculo: data.monitorar[0].nmmodeloveiculo})
        } 
    });
  }
  
  
  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#00B0FF' }} />
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={'Rotas do transporte'} icon1={<FontAwesome name="long-arrow-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#00B0FF' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
                <View style={{flex: 1, display: 'flex', width: '100%'}}>
                    <MapView style={styles.map}
                        showsUserLocation={true}
                        region={initial}
                    >
                        <Marker
                            key={1}
                            //pinColor="red"
                            coordinate={position}
                            title={veiculo.veiculo}
                            description={veiculo.placa}
                        >
                           <Image source={require('../assets/images/onibus.png')} style={{height: 55, width: 55, transform: [{ rotate: '-20deg'}]}} />
                        </Marker>
                    </MapView>
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
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});


{/*

    <MapboxGL.MapView
          ref={(c) => this._map = c}
          zoomLevel={11}
          onPress={this.onPress}
          centerCoordinate={currentLocation.geometry.coordinates}
          style={styles.container}
          styleURL={MapboxGL.StyleURL.Dark}>
          <NearbyPlaces location={currentLocation} onPlacesFetched={this.onPlacesFetched} />
          <Geocoder.LocationMarker />
          <Directions origin={currentLocation} destination={destinationLocation} />
        </MapboxGL.MapView>

*/}