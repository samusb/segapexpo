import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function EscanearQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Favor dar permiso de uso de camara</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escaneando código QR...</Text>
      <View style={styles.qrFrame}> 
        <CameraView 
          style={styles.camera} 
          onBarcodeScanned={(scanningResult) => {
            if (!scannedData) {
              setScannedData(scanningResult.data);
            }
          }}
        />
      </View>

      {scannedData && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>Contenido del QR:</Text>
          <Text style={styles.resultadoTexto}>{scannedData}</Text>
          <Button title="Limpiar y Escanear otro" onPress={() => setScannedData(null)} color="#fbef10" />
        </View>
      )}

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
  message: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  qrFrame: {
    width: 200,
    height: 200,
    //backgroundColor: '#fff',
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fbef10',
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  resultadoContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
    borderWidth: 1,
    borderColor: '#333',
  },
  resultadoTitulo: { color: '#aaa', fontSize: 14, marginBottom: 5 },
  resultadoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
});
