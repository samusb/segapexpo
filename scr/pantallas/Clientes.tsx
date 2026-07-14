import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Modelo/AuthContext';
import { listarClientes } from '../Servicios/ClientesDAO';
import { Cliente } from '../Modelo/Entidades'; // Usamos la definición centralizada
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export default function Clientes() {
  const { usuario } = useAuth();
  const [todosLosClientes, setTodosLosClientes] = useState<Cliente[]>([]);
  const [clientesMostrados, setClientesMostrados] = useState<Cliente[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Verificamos que el usuario y su IdEmpresa existan
    if (usuario && usuario.IdEmpresa) {
      // Llamamos a la función del DAO para obtener los clientes filtrados
      const clientesFiltrados = listarClientes(usuario.IdEmpresa);
      setTodosLosClientes(clientesFiltrados);
      setClientesMostrados(clientesFiltrados);
    }
  }, [usuario, isFocused]); // El efecto se ejecuta cuando el objeto de usuario cambia

  // Efecto para filtrar los clientes según el término de búsqueda
  useEffect(() => {
    if (terminoBusqueda.trim() === '') {
      setClientesMostrados(todosLosClientes);
    } else {
      const filtrados = todosLosClientes.filter(cliente =>
        cliente.primerNombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
      setClientesMostrados(filtrados);
    }
  }, [terminoBusqueda, todosLosClientes]);

  // Componente para renderizar cada ítem de la lista
  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemNombre}>{`${item.primerNombre} ${item.primerApellido}`}</Text>
      <Text style={styles.itemLlamativo}>{item.estadoCuenta}</Text>
      <Text style={styles.itemTerciario}>Rol: {item.rolId}</Text>
      <Text style={styles.itemTerciario}>Telefono: {item.telefono}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          style={styles.botonAgregar}
          onPress={() => navigation.navigate('ClienteFormulario')}
        >
          <Text style={styles.botonAgregarTexto}>+ Agregar Cliente</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por primer nombre..."
            placeholderTextColor="#666"
            value={terminoBusqueda}
            onChangeText={setTerminoBusqueda}
          />
        </View>
        <FlatList
        data={clientesMostrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={
          <Text style={styles.textoVacio}>No se encontraron clientes para esta empresa.</Text>
        }
      /> 
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    width: '100%',
  },
  listaContainer: {
    paddingHorizontal: '5%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginHorizontal: '5%',
    marginVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  itemContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  itemNombre: { color: '#fbef10', fontSize: 18, fontWeight: 'bold' },
  itemLlamativo: { color: '#fff', fontSize: 14, marginTop: 5 },
  itemTerciario: { color: '#aaa', fontSize: 12, marginTop: 5, fontStyle: 'italic' },
  textoVacio: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
  botonAgregar: {
    backgroundColor: '#fbef10ba',
    marginHorizontal: '5%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonAgregarTexto: {
    color: '#070707',
    fontWeight: 'bold',
    fontSize: 16,
  },
});