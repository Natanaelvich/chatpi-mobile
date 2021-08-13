import AsyncStorage from '@react-native-community/async-storage';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../config';
import { store } from '../store';
import { updateTokens } from '../store/modules/auth/actions';
import { RootState } from '../store/modules/rootReducer';

type authData = {
  data: { refresh_token: string };
};
const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const originalConfig = error.config;
    if (error?.response?.status === 401) {
      const state = store.getState() as RootState;
      const {
        data: { refresh_token },
      } = state.auth as authData;

      if (refresh_token && !isRefreshing) {
        isRefreshing = true;

        return api
          .post(`sessions/refresh-token?token=${refresh_token}`)
          .then(response => {
            const {
              token,
              refresh_token: refresh_token_response,
            } = response.data;

            store.dispatch(
              updateTokens({ token, refresh_token: refresh_token_response }),
            );

            AsyncStorage.setItem(
              '@user:data',
              JSON.stringify({ token, refresh_token: refresh_token_response }),
            );

            api.defaults.headers.Authorization = `Bearer ${token}`;
            originalConfig.headers.Authorization = `Bearer ${token}`;

            return api(originalConfig);
          })
          .catch(() => {
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
