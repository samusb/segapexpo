import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

interface GenerarQRProps {
  textoDelQR: string;
  qrRef: React.RefObject<any>;
}

/**
 * Componente para generar el código QR a partir de un string
 * @augments GenerarQRProps
 * @returns {JSX.Element} Componente que muestra el código QR generado a partir del texto pasado como prop
*/
export function GenerarQR({ textoDelQR, qrRef }: GenerarQRProps) {
  
  return (
    <ViewShot ref={qrRef} options={{ format: 'png', quality: 1.0 }}>
        <View style={styles.qrContainer}>
          <QRCode
            value={textoDelQR}
            size={220}
            color="black"
            backgroundColor="white"
          />
        </View>
      </ViewShot>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombras para Android
    shadowColor: '#000', // Sombras para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
   qrContainer: { padding: 15, backgroundColor: 'white', borderRadius: 10, elevation: 3 },
});
