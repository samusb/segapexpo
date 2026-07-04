import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../Context/AuthContext';

// Definimos los tipos para la navegación
type RootStackParamList = {
  Home: { nombre: string; rol: string };
  EscanearQR: undefined;
  Invitar: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Inicio({ navigation }: Props) {
  const { usuario } = useAuth();

  if (!usuario) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Hola, {usuario.nombre}!</Text>
      <Text style={styles.subtitulo}>Favor selecciona la funcion que deseas ejecutar:</Text>

      {/* Botón visible para Guardia (GUA) y Administrador (ADM) */}
      {(usuario.rol === 'GUA' || usuario.rol === 'ADM') && (
        <TouchableOpacity 
          style={styles.boton} 
          onPress={() => navigation.navigate('EscanearQR')}
        >
          <Text style={styles.botonTexto}>Escanear QR</Text>
        </TouchableOpacity>
      )}

      {/* Botón visible para todos excepto Guardia (GUA) */}
      {(usuario.rol !== 'GUA') && (
        <TouchableOpacity 
          style={[styles.boton, { marginTop: 20 }]} 
          onPress={() => navigation.navigate('Invitar')}
        >
          <Text style={styles.botonTexto}>Invitar Usuario</Text>
        </TouchableOpacity>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  boton: {
    backgroundColor: '#fbef10ba',
    borderColor: '#fbef10',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botonTexto: {
    fontWeight: 'bold',
    color: '#000',
  }
});