import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.happy.mundotech.dev',
});

export default api;
