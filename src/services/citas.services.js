import axios from 'axios';
import { API_URL } from '../config/constants';

export const getCitasUsuario = async (cedula) => {
  return axios.get(`${API_URL}/usuarios/buscar/${cedula}`);
};

export const getCitasByDay = async (fecha) => {
  return axios.post(`${API_URL}/citas/buscar/`, { fecha });
};

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

export const actualizarCita = async ({ id, fechaHora, estado, solicitud }) => {
  return axios.put(`${API_URL}/citas/${id}`, {
    fechaHora,
    estado,
    solicitud
  });
};
