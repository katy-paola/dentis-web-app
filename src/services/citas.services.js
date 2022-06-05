import axios from 'axios';
import { API_URL } from '../config/constants';

/**
 * Realiza una solicitud GET a la API y devuelve la respuesta
 * @param cedula - El número de identificación del usuario.
 * @returns La respuesta del servidor.
 */
export const getCitasUsuario = async (cedula) => {
  return axios.get(`${API_URL}/usuarios/buscar/${cedula}`);
};

/**
 * Toma una fecha como parámetro y devuelve una promesa que resuelve un array de objetos
 * @param fecha - La fecha que desea buscar.
 * @returns Una matriz de objetos.
 */
export const getCitasByDay = async (fecha) => {
  return axios.post(`${API_URL}/citas/buscar/`, { fecha });
};

/**
 * Envía una solicitud POST al punto final de la API /citas/ con los datos proporcionados como cuerpo de la
 * solicitud
 * @returns La respuesta del servidor.
 */
export const createCita = async ({
  motivo,
  fechaHora,
  idPaciente,
  estado = 'AGENDADA'
}) => {
  return axios.post(`${API_URL}/citas/`, {
    motivo,
    fechaHora,
    idPaciente,
    estado
  });
};

/**
 * Realiza una petición PUT a la API, enviando el id, fechaHora, estado, y solicitud como cuerpo de
 * la solicitud
 * @returns La respuesta del servidor.
 */
export const actualizarCita = async ({ id, fechaHora, estado, solicitud }) => {
  return axios.put(`${API_URL}/citas/${id}`, {
    fechaHora,
    estado,
    solicitud
  });
};
