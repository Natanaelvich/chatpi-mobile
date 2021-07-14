/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, put, call } from 'redux-saga/effects';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { SagaIterator } from '@redux-saga/core';
import crashlytics from '@react-native-firebase/crashlytics';

import {
  signInSuccess,
  setLoadingSingin,
  signInError,
  signInRequest,
  signOut,
} from './actions';
import api from '../../../services/api';

export function* initCheck(): SagaIterator {
  const userData = yield call([AsyncStorage, 'getItem'], '@user:data');

  if (userData) {
    const user = JSON.parse(userData);

    const { token } = user;
    const decodedToken: {
      exp: number;
    } = jwt(token);

    const dateNow = new Date().getTime() / 1000;

    if (decodedToken.exp < dateNow) {
      yield put(signOut());
      return;
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    yield put(signInSuccess(user));
  }
}

function* signIn({ payload }: ReturnType<typeof signInRequest>): SagaIterator {
  try {
    yield put(setLoadingSingin(true));

    const response = yield call(api.post, 'sessions', {
      email: payload.email,
      password: payload.password,
    });

    yield put(signInSuccess(response.data));
    yield put(signInError({ error: false, messageError: '' }));

    yield call(
      [AsyncStorage, 'setItem'],
      '@user:data',
      JSON.stringify(response.data),
    );

    const { token } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
  } catch (error) {
    crashlytics().recordError(error);
    let messageError =
      'Usuário ou senha incorretos, verifique e tente novamente!';

    if (error?.response?.status >= 500) {
      messageError = 'Problemas no servidor, tente novamente mais tarde!';
    }

    if (error?.message === 'Network Error') {
      messageError =
        'Problemas na rede, verifique sua conexão e tente novamente!';
    }

    yield put(signInError({ error: true, messageError }));
  } finally {
    yield put(setLoadingSingin(false));
  }
}

export default all([takeLatest('@user/SIGN_IN_REQUEST', signIn)]);
