import axios from 'axios';
import { API_URL } from '../config/constants';

/**
 * Devuelve una promesa que resolverá un array de usuarios
 * @returns Un array de usuarios
 */
export const getUsuarios = () => {
  return axios.get(`${API_URL}/usuarios`);
};

/**
 * Toma un objeto con el id del usuario, el nombre, la cédula, el correo electrónico, el número de teléfono y la contraseña, y envía una
 * Solicitud PUT a la API con el id del usuario y los demás campos
 * @returns Una promesa
 */
export const actualizarUsuario = ({
  id,
  nombre,
  cedula,
  email,
  telefono,
  clave
}) => {
  return axios.put(`${API_URL}/usuarios/${id}`, {
    nombre,
    cedula,
    email,
    telefono,
    clave: clave !== '' ? clave : undefined
  });
};
