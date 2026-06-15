import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { validarYUsarInvitacion } from '../Funciones/GenerarInvitacion';

export default function EscanearQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [resultadoValidacion, setResultadoValidacion] = useState<any>(null);

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

  /** Función para procesar el resultado del escaneo, validando el formato y consultando al servidor */
  const procesarEscaneo = async (data: string) => {
    if (scannedData) return; // Evita escaneos duplicados rápidos
    setScannedData(data);

    try {
      const parsed = JSON.parse(data);
      if (parsed.idUnico) {
        const res = await validarYUsarInvitacion(parsed.idUnico);
        setResultadoValidacion(res);
      } else {
        setResultadoValidacion({ success: false, mensaje: 'QR no reconocido por SEGAP' });
      }
    } catch (e) {
      setResultadoValidacion({ success: false, mensaje: 'Formato de código inválido' });
    }
  };

  /** Función para renderizar el contenido escaneado, intentando parsear como JSON y mostrando los detalles de acceso */
  const renderScannedContent = () => {
    if (!resultadoValidacion) return <Text style={styles.resultadoTexto}>Validando con el servidor...</Text>;

    const { success, mensaje, data } = resultadoValidacion;
    
      return (
        <View style={styles.detalleContainer}>
          <Text style={styles.resultadoTitulo}>Permiso:</Text>
          <Text style={[styles.accesoStatus, { color: success ? '#FFF' : '#FFF' }]}>
            {success ? 'CONCEDIDO' : 'DENEGADO'}
          </Text>
          <Text style={styles.resultadoMensaje}>{mensaje}</Text>

          {data && Object.entries(data).map(([key, value]) => (
            <Text key={key} style={styles.resultadoTexto}>
              <Text style={styles.label}>{key}: </Text>
              {String(value)}
            </Text>
          ))}
        </View>
      );
  };

  return (
    <View style={[styles.container, styles.scrollContainer]}>
      <Text style={styles.titulo}>Escaneando código QR...</Text>
      <View style={styles.qrFrame}> 
        <CameraView 
          style={styles.camera} 
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={(result) => procesarEscaneo(result.data)}
        />
      </View>

      {scannedData && (
        <View style={styles.resultadoContainer}>

          {/* <--Muestra el resultado de la validación del QR */}
          {renderScannedContent()} 

          {/* Botón para limpiar el resultado y permitir escanear otro código */}
          <TouchableOpacity 
            style={[styles.boton, { marginTop: 20 }]} 
            onPress={() => {
              setScannedData(null);
              setResultadoValidacion(null);
            }}
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
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    flexGrow: 1,
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
  resultadoMensaje: { color: '#aaa', fontSize: 16, marginBottom: 15, textAlign: 'center' },
  resultadoTitulo: { color: '#fbef10', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  detalleContainer: {
    width: '100%',
    marginBottom: 15,
  },
  accesoStatus: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
