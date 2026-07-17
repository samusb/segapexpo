import { Cliente } from '../Modelo/Entidades';
import clientesData from '../Data/clientes.json';

// Hacemos una copia en memoria para poder modificarla sin alterar el import original.
// Nota: Los cambios realizados a través de este DAO solo existirán durante la sesión
// de la aplicación y no se guardarán permanentemente en el archivo clientes.json.
let clientes: Cliente[] = [...clientesData] as Cliente[];

/**
 * Lista todos los clientes. Opcionalmente puede filtrar por IdEmpresa.
 * @param idEmpresa - (Opcional) El ID de la empresa para filtrar los clientes.
 * @returns Un array de objetos Cliente.
 */
export const listarClientes = (idEmpresa?: string): Cliente[] => {
  let clientesFiltrados = clientes;
  if (idEmpresa) {
    clientesFiltrados = clientes.filter(c => c.IdEmpresa === idEmpresa);
  }

  // Ordenar alfabéticamente por nombre completo de forma ascendente
  clientesFiltrados.sort((a, b) => {
    const nombreA = `${a.primerNombre} ${a.primerApellido}`.toLocaleLowerCase();
    const nombreB = `${b.primerNombre} ${b.primerApellido}`.toLocaleLowerCase();
    return nombreA.localeCompare(nombreB);
  });

  return clientesFiltrados;
};

/**
 * Busca un cliente por su ID.
 * @param idCliente - El ID del cliente a buscar.
 * @returns El objeto Cliente si se encuentra, o undefined si no.
 */
export const buscarClientePorId = (idCliente: string): Cliente | undefined => {
  return clientes.find(c => c.id === idCliente);
};

/**
 * Agrega un nuevo cliente a la lista en memoria.
 * @param nuevoCliente - El objeto del cliente a agregar.
 * @returns El cliente que fue agregado.
 */
export const agregarCliente = (nuevoCliente: Cliente): Cliente => {
  // En una aplicación real, aquí se generaría un ID único.
  clientes.push(nuevoCliente);
  return nuevoCliente;
};

/**
 * Edita un cliente existente en la lista en memoria.
 * @param clienteEditado - El objeto del cliente con la información actualizada. Su 'id' se usa para encontrar el original.
 * @returns El cliente editado o null si no se encontró.
 */
export const editarCliente = (clienteEditado: Cliente): Cliente | null => {
  const index = clientes.findIndex(c => c.id === clienteEditado.id);
  if (index !== -1) {
    clientes[index] = clienteEditado;
    return clienteEditado;
  }
  return null;
};

/**
 * Borra un cliente de la lista en memoria usando su ID.
 * @param idCliente - El ID del cliente que se desea borrar.
 * @returns `true` si el cliente fue borrado, `false` en caso contrario.
 */
export const borrarCliente = (idCliente: string): boolean => {
  const index = clientes.findIndex(c => c.id === idCliente);
  if (index !== -1) {
    clientes.splice(index, 1);
    return true;
  }
  return false;
};