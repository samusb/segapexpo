import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../Modelo/AuthContext';

// Definimos los tipos para la navegación
type RootStackParamList = {
  Home: { nombre: string; rol: string };
  EscanearQR: undefined;
  Invitar: undefined;
  Login: undefined;
  Clientes: undefined; // Añadimos la nueva pantalla
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

      {/* Botón visible solo para Administrador (ADM) */}
      {(usuario.rol === 'ADM') && (
        <TouchableOpacity 
          style={[styles.boton, { marginTop: 20 }]} 
          onPress={() => navigation.navigate('Clientes')}
        >
          <Text style={styles.botonTexto}>Ver Clientes</Text>
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
    width: '90%', // Ocupa el 90% del ancho de la pantalla
    backgroundColor: '#fbef10ba',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center', // Centra el texto horizontalmente
  },
  botonTexto: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  }
});