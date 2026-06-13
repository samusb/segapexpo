import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
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

  const renderScannedContent = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      return (
        <View style={styles.detalleContainer}>
          {Object.entries(parsed).map(([key, value]) => (
            <Text key={key} style={styles.resultadoTexto}>
              <Text style={styles.label}>{key}: </Text>
              {String(value)}
            </Text>
          ))}
        </View>
      );
    } catch (e) {
      // Fallback if data is not valid JSON
      return <Text style={styles.resultadoTexto}>{data}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escaneando código QR...</Text>
      <View style={styles.qrFrame}> 
        <CameraView 
          style={styles.camera} 
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
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
          {renderScannedContent(scannedData)}
         
          <TouchableOpacity 
            style={[styles.boton, { marginTop: 20 }]} 
            onPress={() => setScannedData(null)}
          >
            <Text style={styles.botonTexto}>Limpiar y Escanear otro</Text>
          </TouchableOpacity>
        </View>
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
  resultadoTitulo: { color: '#fbef10', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  detalleContainer: {
    width: '100%',
    marginBottom: 15,
  },
  resultadoTexto: { color: '#fff', fontSize: 14, marginBottom: 5 },
  label: { color: '#fbef10', fontWeight: 'bold', textTransform: 'capitalize' },
  botonTexto: {
    fontWeight: 'bold',
    color: '#000',
  },
   boton: {
    backgroundColor: '#fbef10ba',
    borderColor: '#fbef10',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  }
});
