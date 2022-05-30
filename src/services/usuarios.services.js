import axios from 'axios';
import { API_URL } from '../config/constants';

export const getUsuarios = () => {
  return axios.get(`${API_URL}/usuarios`);
};
