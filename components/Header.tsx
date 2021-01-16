import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, SafeAreaView} from 'react-native';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

export default function Header(props) {
  const navigation = useNavigation();
  //const [modalVisible, setModalVisible] = useState(false);
    
  return (
    <View>
      <View style={{
        backgroundColor: props.color ? props.color : '#FD5266',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 60}}>
        <TouchableHighlight onPress={props.onPress1} activeOpacity={1} underlayColor={'transparent'} style={styles.header_flex_1}>
            <>{props.icon1 ? props.icon1 : <></>}</>
        </TouchableHighlight>
        <View style={styles.header_flex_2}>
            <Text style={{fontSize: 20, color: props.colorText ? props.colorText : 'black'}}>{props.name ? props.name : ''}</Text>
        </View>
        <TouchableHighlight onPress={props.onPress2} activeOpacity={1} underlayColor={'transparent'} style={styles.header_flex_3}>
            <>{props.icon2 ? props.icon2 : <></>}</>
        </TouchableHighlight>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'tomato',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        height: 54
    },
    header_flex_1: {
        display: 'flex',
        flex: 1, 
        //backgroundColor: 'blue', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    header_flex_2: {
        display: 'flex',
        flex: 7, 
        //backgroundColor: 'blue', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    header_flex_3: {
        display: 'flex',
        flex: 1, 
        //backgroundColor: 'blue', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    txt_white_color: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
});