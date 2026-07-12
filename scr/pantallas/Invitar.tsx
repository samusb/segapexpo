import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GenerarQR } from '../Componentes/GenerarQR';
import { BotonWhatsapp } from '../Componentes/BotonWhatsapp';
import { crearInvitacion } from '../Funciones/GenerarInvitacion';
import { useAuth } from '../Modelo/AuthContext';

export default function Invitar() {
  const [invitacion, setInvitacion] = useState<any>(null);
  const qrRef = useRef<any>(null);
  const { usuario } = useAuth();

  useEffect(() => {
    // Al montar la pantalla, solo generamos el objeto de invitación para el QR
    // pero NO lo guardamos en el storage todavía.
    // Se reescribe de forma más explícita para evitar advertencias del linter.
    if (usuario && usuario.clienteInfo && usuario.clienteInfo.id) {
      // En este punto, TypeScript sabe que `usuario.clienteInfo.id` existe y es seguro usarlo.
      const idCliente = usuario.clienteInfo.id;
      const nuevaInvitacion = crearInvitacion(idCliente);
      setInvitacion(nuevaInvitacion);
    }
  }, [usuario]); // Se ejecuta cuando el usuario esté disponible

  const TextoDelQR = invitacion ? JSON.stringify(invitacion) : 'Cargando...';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código de Invitación</Text>

      {invitacion && ( <GenerarQR textoDelQR={TextoDelQR} qrRef={qrRef} /> )}
      <Text style={styles.description}>
        Este es el código QR que se generó para tu invitado.
      </Text>
      {invitacion && <BotonWhatsapp viewShotRef={qrRef} invitacion={invitacion} />}

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
