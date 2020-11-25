import { all, takeLatest, put, call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  signInSuccess,
  setLoadingSingin,
  signInError,
  signInRequest,
} from './actions';
import api from '../../../services/api';

export function* initCheck() {
  try {
  } catch (error) {
    // if error 401 auto logout
  }
}

function* signIn({ payload }: ReturnType<typeof signInRequest>) {
  try {
    // check internet
    yield put(setLoadingSingin(true));
    const response = yield call(api.post, 'sessions', {
      email: payload.email,
      password: payload.password,
    });

    yield put(signInSuccess(response.data));
    yield put(signInError(false));

    yield call(
      [AsyncStorage, 'setItem'],
      '@user:data',
      JSON.stringify(response.data),
    );

    api.interceptors.request.use(config => {
      const headers = { ...config.headers };
      if (response.data.token) {
        headers.Authorization = `Bearer ${response.data.token}`;
      }

      return { ...config, headers };
    });
  } catch (error) {
    yield put(signInError(true));
  } finally {
    yield put(setLoadingSingin(false));
  }
}

export default all([takeLatest('@user/SIGN_IN_REQUEST', signIn)]);
