import axios from 'axios';
import { API_URL } from '../config/constants';

/**
 * Envía una solicitud POST a la API con el correo electrónico y la contraseña del usuario
 * @param clave - La contraseña del usuario
 * @param email - La dirección de correo electrónico del usuario.
 * @returns La respuesta del servidor.
 */
export const loginService = async (clave, email) => {
  return axios.post(`${API_URL}/auth/login`, { clave, email });
};

/**
 * Envía una petición POST a la API con los datos del usuario
 * @returns La respuesta del servidor.
 */
export const registerService = async ({
  nombre,
  cedula,
  email,
  telefono,
  clave,
  rol = 'PACIENTE'
}) => {
  return axios.post(`${API_URL}/usuarios`, {
    nombre,
    cedula,
    email,
    telefono,
    clave,
    rol
  });
};
