import axios from 'axios';
import { API_URL } from '../config/constants';

export const getUsuarios = () => {
  return axios.get(`${API_URL}/usuarios`);
};

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
