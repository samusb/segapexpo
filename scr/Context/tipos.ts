/**
 * Define los tipos de datos centrales para la aplicación.
 */

export interface Cliente {
  id: string;
  primerNombre: string;
  primerApellido: string;
  rolId: 'ADM' | 'GUA' | 'RES' | 'VIS';
  estadoCuenta: 'solvente' | 'insolvente';
  // ...cualquier otra propiedad del cliente
}

export interface Usuario {
  nombre: string;
  rol: 'ADM' | 'GUA' | 'RES' | 'VIS';
  rolDescripcion: string;
  clienteInfo: Cliente;
}