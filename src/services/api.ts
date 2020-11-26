import axios from 'axios';
import env from '../../env';

const api = axios.create({
  baseURL: env.API_URL,
});

export default api;
