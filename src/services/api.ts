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
let failedRequestsQueue: any[] = [];

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const originalConfig = error.config;
    if (error?.response?.status === 401) {
      const state = store.getState() as RootState;
      const {
        data: { refresh_token },
      } = state.auth as authData;

      if (!isRefreshing) {
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

            failedRequestsQueue.forEach(request => request.onSuccess(token));
            failedRequestsQueue = [];
          })
          .catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err));
            failedRequestsQueue = [];
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }
    return Promise.reject(error);
  },
);

export default api;
