import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './scr/pantallas/Inicio';
import EscanearQR from './scr/pantallas/EscanearQR';
import Invitar from './scr/pantallas/Invitar';
import Login from './scr/pantallas/Login';
import Clientes from './scr/pantallas/Clientes';
import ClienteFormulario from './scr/pantallas/ClienteFormulario'; // 1. Importar la nueva pantalla
import { Cliente } from './scr/Modelo/Entidades';
import { AuthProvider, useAuth } from './scr/Modelo/AuthContext';

// Definición de las rutas del Stack
export type RootStackParamList = {
  Home: { nombre: string; rol: string };
  EscanearQR: undefined;
  Invitar: undefined;
  Login: undefined;
  Clientes: undefined;
  ClienteFormulario: { cliente?: Cliente }; // 2. Añadir la ruta a la lista de tipos
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

function Navigation() {
  const { usuario, logout, cargando } = useAuth();

  if (cargando) return null; // O un componente de carga

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={usuario ? "Home" : "Login"}
        screenOptions={{
          headerStyle: { backgroundColor: '#fbef10ba' },
          headerTintColor: '#070707',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => usuario ? (
            <TouchableOpacity 
              onPress={async () => {
                await logout();
              }} 
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: '#070707', fontWeight: 'bold' }}>Salir</Text>
            </TouchableOpacity>
          ) : null
        }}
      >
        {!usuario ? (
          <Stack.Screen 
            name="Login" 
            component={withGlobalScroll(Login)} 
            options={{ title: 'Autenticación', headerShown: false }} 
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={withGlobalScroll(Inicio)} options={{ title: 'Inicio' }} />
            <Stack.Screen name="EscanearQR" component={withGlobalScroll(EscanearQR)} options={{ title: 'Escanear' }} />
            <Stack.Screen name="Invitar" component={withGlobalScroll(Invitar)} options={{ title: 'Invitar Usuario' }} />
            <Stack.Screen name="Clientes" component={Clientes} options={{ title: 'Clientes' }} />
            <Stack.Screen name="ClienteFormulario" component={ClienteFormulario} options={{ title: 'Nuevo Cliente' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
