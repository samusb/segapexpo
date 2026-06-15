import usuarios from '../Data/usuarios.json';

/**
 * Verifica si las credenciales de un usuario existen en el listado.
 * @param {string} usuarioEmail - El correo electrónico ingresado.
 * @param {string} clave - La contraseña ingresada.
 * @returns {boolean} - true si las credenciales son válidas, false de lo contrario.
 */
export const verificarUsuario = (usuarioEmail, clave) => {
  return usuarios.some(u => 
    u.email.toLowerCase() === usuarioEmail.toLowerCase() && 
    u.clave === clave
  );
};