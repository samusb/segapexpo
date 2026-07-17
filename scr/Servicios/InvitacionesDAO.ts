import AsyncStorage from '@react-native-async-storage/async-storage';
import invitacionesData from '../Data/invitaciones.json';
import clientesData from '../Data/clientes.json';
import residenciasData from '../Data/residencias.json';
import {
  Cliente,
  Invitacion,
  Residencia,
  DatosAcceso,
  TipoInvitacion,
  EstadoInvitacion,
} from '../Modelo/Entidades';

// Hacemos copias en memoria para poder trabajar con los datos.
const clientes: Cliente[] = clientesData as Cliente[];
const residencias: Residencia[] = residenciasData as Residencia[];

/**
 * Genera un ID único para la invitación.
 * @param tipo - El tipo de invitación ('residente' o 'visitante').
 * @param idCliente - El ID del cliente que genera la invitación.
 * @returns Un ID único con el formato TIPO_IDCLIENTE_TIMESTAMP.
 */
const generarIdUnico = (tipo: TipoInvitacion, idCliente: string): string => {
  const timestamp = Date.now();
  const prefix = tipo === 'residente' ? 'RES' : 'VIS';
  return `${prefix}_${idCliente}_${timestamp}`;
};

/**
 * Crea un nuevo objeto de invitación de visitante.
 * @param idCliente - ID del cliente que genera la invitación.
 * @param tipo - 'residente' o 'visitante'.
 * @param estado - 'activo', 'inactivo' o 'vencido'.
 * @returns El objeto de la nueva invitación creada.
 */
export const crearInvitacion = (
  idCliente: string,
  tipo: TipoInvitacion = 'visitante',
  estado: EstadoInvitacion = 'activo'
): Invitacion => {
  const nuevaInvitacion: Invitacion = {
    idUnico: generarIdUnico(tipo, idCliente),
    estado,
  };
  console.log('Nueva invitación creada:', nuevaInvitacion);
  return nuevaInvitacion;
};

/**
 * Guarda una nueva invitación en AsyncStorage.
 * @param invitacion - Objeto de invitación a guardar.
 */
export const guardarInvitacion = async (invitacion: Invitacion): Promise<void> => {
  try {
    const invitacionesGuardadas = await AsyncStorage.getItem('invitaciones');
    const invitacionesArray: Invitacion[] = invitacionesGuardadas 
      ? JSON.parse(invitacionesGuardadas) 
      : [...invitacionesData];
    
    invitacionesArray.push(invitacion);
    await AsyncStorage.setItem('invitaciones', JSON.stringify(invitacionesArray));
    console.log('Invitación guardada correctamente:', invitacion);
  } catch (error) {
    console.error('Error al guardar invitación:', error);
    // En una app real, podrías lanzar el error para que el llamador lo maneje.
    throw new Error('No se pudo guardar la invitación.');
  }
};

/**
 * Valida si una invitación existe y está activa. Si es válida, la marca como 'inactivo'.
 * @param idUnico - ID único de la invitación a validar.
 * @returns Un objeto con el resultado de la validación y los datos de acceso si es exitosa.
 */
export const validarYUsarInvitacion = async (idUnico: string): Promise<{ success: boolean; mensaje: string; data?: DatosAcceso | Invitacion }> => {
  try {
    const invitacionesGuardadas = await AsyncStorage.getItem('invitaciones');
    let invitacionesArray: Invitacion[] = invitacionesGuardadas 
      ? JSON.parse(invitacionesGuardadas) 
      : [...invitacionesData];
    
    const index = invitacionesArray.findIndex(inv => inv.idUnico === idUnico);
    
    if (index === -1) {
      return { success: false, mensaje: 'Invitación no registrada en el sistema' };
    }

    const invitacion = invitacionesArray[index];

    if (invitacion.estado !== 'activo') {
      return { success: false, mensaje: `Código ya utilizado o vencido (${invitacion.estado})`, data: invitacion };
    }

    const idCliente = idUnico.split('_')[1];
    const cliente = clientes.find(c => c.id === idCliente);
    const residencia = residencias.find(r => r.cliente === idCliente);

    if (!cliente || !residencia) {
      return { success: false, mensaje: 'Invitación inválida. Residente no encontrado.' };
    }

    if (cliente.estadoCuenta !== 'solvente') {
      return { success: false, mensaje: `Acceso denegado. El residente de la casa ${residencia.casa}-${residencia.bloque} no está solvente.` };
    }

    // Marcar como inactivo para que no se pueda volver a usar
    invitacionesArray[index].estado = 'inactivo';
    await AsyncStorage.setItem('invitaciones', JSON.stringify(invitacionesArray));

    const datosAcceso: DatosAcceso = {
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