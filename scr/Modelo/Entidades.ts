/**
 * Define los tipos de datos centrales para la aplicación.
 */

export interface Cliente {
   id: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  telefono: string;
  estadoCuenta: 'solvente' | 'mora';
  fechaUltimoPago: string;
  rolId: 'ADM' | 'GUA' | 'RES';
  IdEmpresa: string;
}

export interface Usuario {
  nombre: string;
  rol: 'ADM' | 'GUA' | 'RES' | 'VIS';
  rolDescripcion: string;
  clienteInfo: Cliente;
  IdEmpresa: string;
}

/**
 * Representa la estructura de las credenciales de un usuario en `usuarios.json`.
 */
export interface CredencialUsuario {
  usuario: string;
  clave: string;
  idCliente: string;
}