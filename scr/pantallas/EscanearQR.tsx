import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function EscanearQR() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para abrir a câmera</Text>
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
          onBarcodeScanned={(scanningResult) => console.log(scanningResult.data)}
        />
      </View>

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
});
