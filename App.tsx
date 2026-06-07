import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './scr/pantallas/Inicio';
import EscanearQR from './scr/pantallas/EscanearQR';
import Invitar from './scr/pantallas/Invitar';

// Definición de las rutas del Stack
export type RootStackParamList = {
  Home: undefined;
  EscanearQR: undefined;
  Invitar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fbef10' },
          headerTintColor: '#070707',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={Inicio} options={{ title: 'Inicio' }} />
        <Stack.Screen name="EscanearQR" component={EscanearQR} options={{ title: 'Escanear' }} />
        <Stack.Screen name="Invitar" component={Invitar} options={{ title: 'Invitar Usuario' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
