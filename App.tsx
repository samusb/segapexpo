import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './scr/pantallas/Inicio';
import EscanearQR from './scr/pantallas/EscanearQR';
import Invitar from './scr/pantallas/Invitar';
import Login from './scr/pantallas/Login';

// Definición de las rutas del Stack
export type RootStackParamList = {
  Home: undefined;
  EscanearQR: undefined;
  Invitar: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// HOC para envolver cualquier pantalla en un ScrollView global
const withGlobalScroll = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#080808' }} 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Component {...props} />
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#fbef10ba' },
          headerTintColor: '#070707',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={withGlobalScroll(Login)} 
          options={{ title: 'Autenticación', headerShown: false }} 
        />
        <Stack.Screen name="Home" component={withGlobalScroll(Inicio)} options={{ title: 'Inicio' }} />
        <Stack.Screen name="EscanearQR" component={withGlobalScroll(EscanearQR)} options={{ title: 'Escanear' }} />
        <Stack.Screen name="Invitar" component={withGlobalScroll(Invitar)} options={{ title: 'Invitar Usuario' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
