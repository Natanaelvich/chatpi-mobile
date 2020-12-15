import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import {
  signInSuccess,
  setLoadingSingin,
  signInError,
  signInRequest,
  signOut,
} from './actions';
import api from '../../../services/api';

export function* initCheck() {
  const userData = yield call([AsyncStorage, 'getItem'], '@user:data');

  if (userData) {
    const { token } = JSON.parse(userData);

    const decodedToken = jwt(token);
    const dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      yield put(signOut());
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    console.log(userData);
  }
}

function* signIn({ payload }: ReturnType<typeof signInRequest>) {
  try {
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

    const { token } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
  } catch (error) {
    yield put(signInError(true));
  } finally {
    yield put(setLoadingSingin(false));
  }
}

export default all([takeLatest('@user/SIGN_IN_REQUEST', signIn)]);
