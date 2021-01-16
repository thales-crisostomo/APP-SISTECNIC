import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Starter from './components/Starter';
import PreLoading from './components/PreLoading';
import Home from './components/Home';

/*
//menu
import Carteirinha from './components/gestao/Carteirinha';
import QuadroHorario from './components/gestao/QuadroHorario';
import Rotas from './components/Rotas';
import QRcode from './components/Qrcode';
import Mural from './components/Mural';
import QuadroProva from './components/QuadroProva';
import QuadroRefeicao from './components/QuadroRefeicao';
import Notas from './components/Notas';
import Documentos from './components/Documentos';
*/


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="PreLoading" component={PreLoading} />
        <Stack.Screen name="Starter" component={Starter} />
        <Stack.Screen name="Home" component={Home} />
        {/*   MENUU  
        <Stack.Screen name="Carteirinha" component={Carteirinha} />
        <Stack.Screen name="QuadroHorario" component={QuadroHorario} />
        <Stack.Screen name="QuadroProva" component={QuadroProva} />
        <Stack.Screen name="QuadroRefeicao" component={QuadroRefeicao} />
        <Stack.Screen name="Notas" component={Notas} />
        <Stack.Screen name="Mural" component={Mural} />
        <Stack.Screen name="Rotas" component={Rotas} />
        <Stack.Screen name="Documentos" component={Documentos} />
        <Stack.Screen name="Qrcode" component={QRcode} />
         */}
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default App;