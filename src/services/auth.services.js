import axios from 'axios';
import { API_URL } from '../config/constants';

//enviarle al backend el correo y la contraseña
export const loginService = async (clave, email) => {
  return axios.post(`${API_URL}/auth/login`, { clave, email });
};

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
