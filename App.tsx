import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import EscanearQR from './scr/pantallas/EscanearQR';

export default function App() {
  // Estado para controlar qué pantalla mostrar
  const [mostrarScanner, setMostrarScanner] = useState(false);

  if (mostrarScanner) {
    // Si el estado es true, mostramos el componente del Scanner
    // Podrías pasar una función para "cerrar" el scanner si quisieras
    return <EscanearQR />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SEGAP</Text>
      <Text style={styles.subtitulo}>Sistema de Gestión de accesos</Text>

      <TouchableOpacity 
        style={styles.boton} 
        onPress={() => setMostrarScanner(true)}
      >
        <Text style={styles.boton}>Iniciar Escaneo QR</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
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
  }
});
