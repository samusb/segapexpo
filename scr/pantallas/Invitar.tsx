import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GenerarQR } from '../Componentes/GenerarQR';
import { BotonWhatsapp } from '../Componentes/BotonWhatsapp';
import { crearYGuardarInvitacion } from '../Funciones/GenerarInvitacion';

export default function Invitar() {
  const [invitacion, setInvitacion] = useState<any>(null);
  const qrRef = useRef<any>(null);

  useEffect(() => {
    const generarDatos = async () => {
      const resultado = await crearYGuardarInvitacion(
        '1617', 
        'A', 
        'visitante', 
        'activo', 
        new Date().toISOString().split('T')[0]
      );
      if (resultado.success) {
        setInvitacion(resultado.data);
      }
    };

    generarDatos();
  }, []); // Se ejecuta solo una vez al montar

  const TextoDelQR = invitacion ? JSON.stringify(invitacion) : 'Cargando...';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Invitación</Text>

      {invitacion && ( <GenerarQR textoDelQR={TextoDelQR} qrRef={qrRef} /> )}
      {invitacion && <BotonWhatsapp viewShotRef={qrRef} />}

      <Text style={styles.description}>
        Este es el código QR que se generó para tu invitado.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080808',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  qrWrapper: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 24,
  },
});
