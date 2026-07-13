import { Usuario, Cliente } from '../Modelo/Entidades';
import usuarios from '../Data/usuarios.json';
import clientes from '../Data/clientes.json';
import roles from '../Data/roles.json';

/**
 * Verifica si las credenciales de un usuario existen en el listado.
 * @param usuarioLogin - El nombre de usuario ingresado.
 * @param clave - La contraseña ingresada.
 * @returns El objeto del usuario si las credenciales son válidas, null de lo contrario.
 */
export const verificarUsuario = (usuarioLogin: string, clave: string): Usuario | null => {
  // 1. Buscar en el archivo de credenciales
  const credencial = usuarios.find(u => 
    u.usuario.toLowerCase() === usuarioLogin.toLowerCase() && 
    u.clave === clave
  );

  if (!credencial) {
    return null; // Credenciales incorrectas
  }

  // 2. Usar el idCliente para buscar los datos completos en clientes.json
  const cliente = clientes.find(c => c.id === credencial.idCliente);
  if (!cliente) {
    return null; // Inconsistencia de datos, el cliente no existe
  }

  // 3. Buscar la descripción del rol
  const rol = roles.find(r => r.id === cliente.rolId);

  // 4. Construir el objeto de usuario para la sesión
  return {
    nombre: cliente.primerNombre,
    rol: cliente.rolId as 'ADM' | 'GUA' | 'RES', // 'ADM', 'GUA', 'RES'
    IdEmpresa: cliente.IdEmpresa,
    rolDescripcion: rol ? rol.descripcion : 'Desconocido',
    clienteInfo: cliente as Usuario['clienteInfo'],
  };
};