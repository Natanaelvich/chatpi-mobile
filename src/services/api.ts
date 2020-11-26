import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.3.2:3335',
  baseURL: 'http://192.168.0.108:3335',
  // baseURL: 'https://api.pi.mundotech.dev',
});

export default api;
