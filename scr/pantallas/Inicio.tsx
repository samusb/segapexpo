import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Definimos los tipos para la navegación
type RootStackParamList = {
  Home: undefined;
  EscanearQR: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Inicio({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SEGAP</Text>
      <Text style={styles.subtitulo}>Sistema de Gestión de accesos</Text>

      <TouchableOpacity 
        style={styles.boton} 
        onPress={() => navigation.navigate('EscanearQR')}
      >
        <Text style={styles.botonTexto}>Escanear QR</Text>
      </TouchableOpacity>

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
  },
  boton: {
    backgroundColor: '#fbef10',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botonTexto: {
    fontWeight: 'bold',
    color: '#000',
  }
});