import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { verificarUsuario } from '../DAO/UsuarioDAO'; // Corregido: Apunta a la nueva carpeta DAO
import { useAuth } from '../Modelo/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ }: Props) {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const { login } = useAuth();

  const manejarLogin = async () => {
    if (!email || !clave) {
      Alert.alert('Atención', 'Por favor complete todos los campos.');
      return;
    }

    // Al usar .ts, el tipo de usuarioEncontrado se infiere correctamente como Usuario | null
    const usuarioEncontrado = verificarUsuario(email, clave);

    if (usuarioEncontrado) {
      // Guardamos en la variable de sesión global
      await login(usuarioEncontrado);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SEGAP</Text>
      <Text style={styles.subtitulo}>Gestión de Accesos</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#666"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={manejarLogin}>
        <Text style={styles.botonTexto}>INGRESAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  titulo: {
    color: '#fbef10',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitulo: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  boton: {
    backgroundColor: '#fbef10ba',
    borderColor: '#fbef10',
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
});