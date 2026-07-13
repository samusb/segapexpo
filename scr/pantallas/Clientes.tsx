import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Modelo/AuthContext';
import { listarClientes } from '../Servicios/ClientesDAO';
import { Cliente } from '../Modelo/Entidades'; // Usamos la definición centralizada

export default function Clientes() {
  const { usuario } = useAuth();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Verificamos que el usuario y su IdEmpresa existan
    if (usuario && usuario.IdEmpresa) {
      // Llamamos a la función del DAO para obtener los clientes filtrados
      const clientesFiltrados = listarClientes(usuario.IdEmpresa);
      setClientes(clientesFiltrados);
    }
  }, [usuario]); // El efecto se ejecuta cuando el objeto de usuario cambia

  // Componente para renderizar cada ítem de la lista
  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemNombre}>{`${item.primerNombre} ${item.primerApellido}`}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
      <Text style={styles.itemRol}>Rol: {item.rolId}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={clientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        contentContainerStyle={styles.listaContainer}
        ListHeaderComponent={
          <Text style={styles.titulo}>Clientes de la Empresa</Text>
        }
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
  itemContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  itemNombre: { color: '#fbef10', fontSize: 18, fontWeight: 'bold' },
  itemEmail: { color: '#fff', fontSize: 14, marginTop: 5 },
  itemRol: { color: '#aaa', fontSize: 12, marginTop: 5, fontStyle: 'italic' },
  textoVacio: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
});