import axios from 'axios';
import { BASE_URL } from '../components/config';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
