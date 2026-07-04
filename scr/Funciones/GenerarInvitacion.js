import AsyncStorage from '@react-native-async-storage/async-storage';
import invitacionesData from '../Data/invitaciones.json';
import clientes from '../Data/clientes.json';
import residencias from '../Data/residencias.json';

/**
 * Genera un ID único para la invitación
 */
const generarIdUnico = (tipo, idCliente) => {
  const timestamp = Date.now();
  const prefix = tipo === 'residente' ? 'RES' : 'VIS'; // 'VIS' para visitante
  return `${prefix}_${idCliente}_${timestamp}`;
};

/**
 * Crea una nueva invitación de visitante
 * @param {string} idCliente - ID del cliente que genera la invitación
 * @param {string} tipo - 'residente' o 'visitante'
 * @param {string} estado - 'activo' o 'vencido'
 * @returns {Object} Nueva invitación creada
 */
export const crearInvitacion = (
  idCliente,
  tipo = 'visitante',
  estado = 'activo'
) => {
  const nuevaInvitacion = {
    idUnico: generarIdUnico(tipo, idCliente),
    estado,
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
    const invitacionesArray = invitacionesGuardadas ? JSON.parse(invitacionesGuardadas) : [...invitacionesData];
    
    // Guardamos solo el idUnico y el estado
    const invitacionParaGuardar = {
      idUnico: invitacion.idUnico,
      estado: invitacion.estado,
    };
    invitacionesArray.push(invitacionParaGuardar);
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
 * @param {string} idCliente - ID del cliente que genera la invitación
 * @param {string} tipo - 'residente' o 'visitante'
 * @param {string} estado - 'activo' o 'vencido'
 */
export const crearYGuardarInvitacion = async (idCliente, tipo = 'visitante', estado = 'activo') => {
  const nuevaInvitacion = crearInvitacion(idCliente, tipo, estado);
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

/**
 * Valida si una invitación existe, está activa y la marca como usada (inactivo)
 * @param {string} idUnico - ID único de la invitación a validar
 */
export const validarYUsarInvitacion = async (idUnico) => {
  try {
    const invitacionesGuardadas = await AsyncStorage.getItem('invitaciones');
    let invitacionesArray = invitacionesGuardadas ? JSON.parse(invitacionesGuardadas) : [...invitacionesData];
    
    const index = invitacionesArray.findIndex(inv => inv.idUnico === idUnico);
    
    if (index === -1) {
      return { success: false, mensaje: 'Invitación no registrada en el sistema' };
    }

    const invitacion = invitacionesArray[index];

    // Validar el estado de la invitación
    if (invitacion.estado !== 'activo') {
      return { success: false, mensaje: `Código ya utilizado o vencido (${invitacion.estado})`, data: invitacion };
    }

    // Extraer el idCliente del idUnico de la invitación
    const idCliente = idUnico.split('_')[1];
    const cliente = clientes.find(c => c.id === idCliente);
    const residencia = residencias.find(r => r.cliente === idCliente);

    if (!cliente || !residencia) {
      return { success: false, mensaje: 'Invitación inválida. Residente no encontrado.' };
    }

    // Validar el estado de cuenta del residente que invita
    if (cliente.estadoCuenta !== 'solvente') {
      return { success: false, mensaje: `Acceso denegado. El residente de la casa ${residencia.casa}-${residencia.bloque} no está solvente.` };
    }

    // Marcamos como inactivo para que no se pueda volver a usar
    invitacionesArray[index].estado = 'inactivo';
    await AsyncStorage.setItem('invitaciones', JSON.stringify(invitacionesArray));

    // Construir el objeto de datos para la respuesta
    const datosAcceso = {
      "Invitado por": `${cliente.primerNombre} ${cliente.primerApellido}`,
      "Residencia": `Casa ${residencia.casa}, Bloque ${residencia.bloque}`,
      "Estado de Residente": cliente.estadoCuenta,
    };

    return { success: true, mensaje: 'Acceso Permitido', data: datosAcceso };
  } catch (error) {
    console.error('Error al validar invitación:', error);
    return { success: false, mensaje: 'Error técnico al procesar el acceso' };
  }
};
