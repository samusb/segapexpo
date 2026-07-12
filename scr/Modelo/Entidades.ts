/**
 * #########
 * OBJETIVO:
 * #########
 *    Representar las entidades de la aplicación, como `Cliente`, `SesionUsuario` y `Usuarios`.
 *    Estas interfaces se utilizan para tipar los datos que se manejan en la aplicación,
 *    asegurando consistencia y seguridad de tipos en TypeScript.
 */

/**
 * Representa la estructura de un cliente en `clientes.json`.
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
}

/**
 * Representa la estructura de un usuario en sesión.
 */
export interface SesionUsuario {
  nombre: string;
  rol: 'ADM' | 'GUA' | 'RES' | 'VIS';
  rolDescripcion: string;
  clienteInfo: Cliente;
}

/**
 * Representa la estructura de las credenciales de un usuario en `usuarios.json`.
 */
export interface Usuarios {
  usuario: string;
  clave: string;
  idCliente: string;
}