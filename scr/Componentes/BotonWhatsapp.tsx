import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';
import { guardarInvitacion } from '../Servicios/InvitacionesDAO';
import { Invitacion } from '../Modelo/Entidades';


/**
 * Componente para compartir el código QR generado a través de WhatsApp, Necesita el ref del ViewShot para capturar la imagen del QR
 * @param {Object} props - Las props para el componente
 * @param {React.RefObject<any>} props.viewShotRef - El ref del ViewShot que contiene el QR
 * @param {Invitacion} props.invitacion - El objeto de la invitación para guardar antes de compartir
 * @returns {JSX.Element} Componente que muestra el botón para compartir en WhatsApp
 */
export const BotonWhatsapp = ({ viewShotRef, invitacion }: { viewShotRef: React.RefObject<any>, invitacion: Invitacion }) => {

  const compartirPorWhatsApp = async () => {
    try {
      // Verificamos si el dispositivo permite compartir
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Error", "La función de compartir no está disponible en este dispositivo.");
        return;
      }

      // Guardamos la invitación en el almacenamiento local al presionar el botón
      await guardarInvitacion(invitacion);

      const uri = await viewShotRef.current.capture();// Espera a que se capture la imagen del QR generado en el componente GenerarQR, utilizando el ref pasado como prop

      // Abre el menú de compartir del sistema
      await Sharing.shareAsync(uri, { dialogTitle: 'Compartir Acceso QR' });
    } catch (error) {
      Alert.alert("Error", "No se pudo compartir en WhatsApp de forma automática.");
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.boton, { marginTop: 20 }]} 
          onPress={() => compartirPorWhatsApp()}
        >
          <Text style={styles.botonTexto}>Compartir por WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  statusText: { marginTop: 15, fontSize: 16, fontWeight: '600', color: 'green' },
  buttonContainer: { marginTop: 30, width: '80%' },
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