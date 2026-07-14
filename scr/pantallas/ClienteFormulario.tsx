import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../Modelo/AuthContext';
import { agregarCliente } from '../Servicios/ClientesDAO';
import { Cliente } from '../Modelo/Entidades';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ClienteFormulario'>;

export default function ClienteFormulario({ navigation }: Props) {
  const { usuario } = useAuth();
  const [formState, setFormState] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
    telefono: '',
  });

  const handleChange = (name: keyof typeof formState, value: string) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleGuardarCliente = () => {
    if (!formState.primerNombre || !formState.primerApellido || !formState.email) {
      Alert.alert('Error', 'Los campos de primer nombre, primer apellido y email son obligatorios.');
      return;
    }

    const nuevoCliente: Cliente = {
      // En una app real, el ID debería ser único y generado de forma segura.
      id: `RES-NEW-${Date.now()}`, 
      ...formState,
      estadoCuenta: 'solvente', // Valor por defecto
      fechaUltimoPago: new Date().toISOString().split('T')[0], // Fecha actual
      rolId: 'RES', // Rol por defecto para nuevos clientes
      IdEmpresa: usuario?.IdEmpresa || '',
    };

    agregarCliente(nuevoCliente);
    Alert.alert('Éxito', 'Cliente agregado correctamente.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuevo Cliente</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Primer Nombre *"
        placeholderTextColor="#666"
        value={formState.primerNombre}
        onChangeText={(val) => handleChange('primerNombre', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Segundo Nombre"
        placeholderTextColor="#666"
        value={formState.segundoNombre}
        onChangeText={(val) => handleChange('segundoNombre', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Primer Apellido *"
        placeholderTextColor="#666"
        value={formState.primerApellido}
        onChangeText={(val) => handleChange('primerApellido', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Segundo Apellido"
        placeholderTextColor="#666"
        value={formState.segundoApellido}
        onChangeText={(val) => handleChange('segundoApellido', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email *"
        placeholderTextColor="#666"
        value={formState.email}
        onChangeText={(val) => handleChange('email', val)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#666"
        value={formState.telefono}
        onChangeText={(val) => handleChange('telefono', val)}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.boton} onPress={handleGuardarCliente}>
        <Text style={styles.botonTexto}>Guardar Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  boton: {
    backgroundColor: '#fbef10ba',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#070707',
    fontWeight: 'bold',
    fontSize: 16,
  },
});