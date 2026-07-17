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

// --- Tipos y Entidades para Invitaciones ---

export type TipoInvitacion = 'residente' | 'visitante';
export type EstadoInvitacion = 'activo' | 'inactivo' | 'vencido';

/**
 * Representa la estructura de una invitación.
 */
export interface Invitacion {
  idUnico: string;
  estado: EstadoInvitacion;
}

/**
 * Representa la estructura de una residencia en residencias.json.
 */
export interface Residencia {
  cliente: string; // Corresponde al id del Cliente
  casa: string;
  bloque: string;
  // Las siguientes propiedades existen en el JSON pero no se usan actualmente.
  // Se pueden descomentar si son necesarias en el futuro.
  // latitud: number;
  // longitud: number;
}

/**
 * Representa los datos de acceso que se muestran al validar un QR.
 */
export interface DatosAcceso {
  "Invitado por": string;
  "Residencia": string;
  "Estado de Residente": 'solvente' | 'mora';
}