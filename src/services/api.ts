import axios from 'axios';
import env from '../../env';

const api = axios.create({
  baseURL: 'https://api.pi.mundotech.dev',
});

export default api;
