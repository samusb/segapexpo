import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../Modelo/AuthContext';
import { agregarCliente, editarCliente, borrarCliente } from '../DAO/ClientesDAO';
import { Cliente } from '../Modelo/Entidades';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ClienteFormulario'>;

export default function ClienteFormulario({ navigation, route }: Props) {
  // Extraemos el cliente de los parámetros de la ruta, si existe.
  const clienteExistente = route.params?.cliente;

  const { usuario } = useAuth();
  const [formState, setFormState] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
    telefono: '',
  });

  // Si estamos editando, llenamos el formulario con los datos del cliente.
  useEffect(() => {
    if (clienteExistente) {
      setFormState({
        primerNombre: clienteExistente.primerNombre,
        segundoNombre: clienteExistente.segundoNombre || '',
        primerApellido: clienteExistente.primerApellido,
        segundoApellido: clienteExistente.segundoApellido || '',
        email: clienteExistente.email,
        telefono: clienteExistente.telefono || '',
      });
    }
  }, [clienteExistente]);
  const handleChange = (name: keyof typeof formState, value: string) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleGuardarCliente = () => {
    if (!formState.primerNombre || !formState.primerApellido || !formState.email) {
      Alert.alert('Error', 'Los campos de primer nombre, primer apellido y email son obligatorios.');
      return;
    }

    if (clienteExistente) {
      // Lógica para editar
      const clienteActualizado: Cliente = {
        ...clienteExistente,
        ...formState,
      };
      editarCliente(clienteActualizado);
      Alert.alert('Éxito', 'Cliente actualizado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      // Lógica para agregar un nuevo cliente
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
    }
  };

  const handleBorrarCliente = () => {
    if (!clienteExistente) return;

    Alert.alert(
      "Confirmar Borrado",
      `¿Estás seguro de que deseas borrar a ${clienteExistente.primerNombre} ${clienteExistente.primerApellido}? Esta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Borrar", 
          onPress: () => {
            borrarCliente(clienteExistente.id);
            Alert.alert('Éxito', 'Cliente borrado correctamente.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
          },
          style: 'destructive' // Estilo para iOS que resalta la acción destructiva
        }
      ]
    );
  };
  return (
    <ScrollView style={styles.container}>
      {/* El título cambia si estamos editando o creando */}
      <Text style={styles.title}>{clienteExistente ? 'Editar Cliente' : 'Nuevo Cliente'}</Text>
      
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
        <Text style={styles.botonTexto}>{clienteExistente ? 'Actualizar Cliente' : 'Guardar Cliente'}</Text>
      </TouchableOpacity>

      {clienteExistente && (
        <TouchableOpacity style={styles.botonBorrar} onPress={handleBorrarCliente}>
          <Text style={styles.botonBorrarTexto}>Borrar Cliente</Text>
        </TouchableOpacity>
      )}
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
  botonBorrar: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#c1121f',
  },
  botonBorrarTexto: {
    color: '#c1121f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});