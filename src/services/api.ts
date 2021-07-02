import axios from 'axios';

const { BASE_URL_DEV } = process.env;
const { BASE_URL_PRO } = process.env;

const api = axios.create({
  baseURL: !__DEV__ ? BASE_URL_DEV : BASE_URL_PRO,
});

export default api;
