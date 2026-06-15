import usuarios from '../Data/usuarios.json';

export interface Usuario {
  email: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  rol: 'residente' | 'guardia' | 'administrador' | 'parametrizador';
  clave: string;
}

/**
 * Verifica si las credenciales de un usuario existen en el listado.
 * @param usuarioEmail - El correo electrónico ingresado.
 * @param clave - La contraseña ingresada.
 * @returns El objeto del usuario si las credenciales son válidas, null de lo contrario.
 */
export const verificarUsuario = (usuarioEmail: string, clave: string): Usuario | null => {
  const usuario = (usuarios as Usuario[]).find(u => 
    u.email.toLowerCase() === usuarioEmail.toLowerCase() && 
    u.clave === clave
  );
  return usuario || null;
};