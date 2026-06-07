import AsyncStorage from '@react-native-async-storage/async-storage';
import invitacionesData from '../Data/invitaciones.json';

/**
 * Genera un ID único para la invitación
 */
const generarIdUnico = (tipo, casa, bloque) => {
  const timestamp = Date.now();
  const prefix = tipo === 'residente' ? 'RES' : 'VIS';
  return `${prefix}_${casa}_${bloque}_${timestamp}`;
};

/**
 * Crea una nueva invitación de visitante
 * @param {string} casa - Número de casa
 * @param {string} bloque - Letra del bloque
 * @param {string} tipo - 'residente' o 'visitante'
 * @param {string} estado - 'activo' o 'vencido'
 * @param {string} fechaUltimoPago - Fecha en formato YYYY-MM-DD
 * @returns {Object} Nueva invitación creada
 */
export const crearInvitacion = (
  casa,
  bloque,
  tipo = 'visitante',
  estado = 'activo',
  fechaUltimoPago = new Date().toISOString().split('T')[0]
) => {
  const nuevaInvitacion = {
    url: "www.truetech.hn",
    tipo,
    casa,
    bloque,
    fechaUltimoPago,
    estado,
    idUnico: generarIdUnico(tipo, casa, bloque)
  };
  console.log('Nueva invitación creada:', nuevaInvitacion);
  return nuevaInvitacion;
};

/**
 * Guarda una nueva invitación en AsyncStorage
 * @param {Object} invitacion - Objeto de invitación a guardar
 */
export const guardarInvitacion = async (invitacion) => {
  try {
    const invitacionesGuardadas = await AsyncStorage.getItem('invitaciones');
    const invitacionesArray = invitacionesGuardadas ? JSON.parse(invitacionesGuardadas) : invitacionesData;
    
    invitacionesArray.push(invitacion);
    await AsyncStorage.setItem('invitaciones', JSON.stringify(invitacionesArray));
    console.log('Invitación guardada correctamente:', invitacion);
    console.log('Invitaciones actuales:', invitacionesArray);
    return { success: true, message: 'Invitación guardada correctamente', data: invitacion };
   
  } catch (error) {
    console.error('Error al guardar invitación:', error);
    return { success: false, message: 'Error al guardar invitación', error };
  }
};

/**
 * Crea y guarda una nueva invitación en una sola operación
 * @param {string} casa - Número de casa
 * @param {string} bloque - Letra del bloque
 * @param {string} tipo - 'residente' o 'visitante'
 * @param {string} estado - 'activo' o 'vencido'
 * @param {string} fechaUltimoPago - Fecha en formato YYYY-MM-DD
 */
export const crearYGuardarInvitacion = async (
  casa,
  bloque,
  tipo = 'visitante',
  estado = 'activo',
  fechaUltimoPago = new Date().toISOString().split('T')[0]
) => {
  const nuevaInvitacion = crearInvitacion(casa, bloque, tipo, estado, fechaUltimoPago);
  return await guardarInvitacion(nuevaInvitacion);
};

/**
 * Obtiene todas las invitaciones guardadas
 */
export const obtenerInvitaciones = async () => {
  try {
    const invitacionesGuardadas = await AsyncStorage.getItem('invitaciones');
    return invitacionesGuardadas ? JSON.parse(invitacionesGuardadas) : invitacionesData;
  } catch (error) {
    console.error('Error al obtener invitaciones:', error);
    return invitacionesData;
  }
};
