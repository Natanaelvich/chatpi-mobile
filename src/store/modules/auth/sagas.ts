/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, put, call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { SagaIterator } from '@redux-saga/core';

import {
  signInSuccess,
  setLoadingSingin,
  signInError,
  signInRequest,
  updateTokens,
  updateUser,
} from './actions';
import api from '../../../services/api';
import { sendError } from '../../../services/sendError';
import { addUsers } from '../users/actions';

export function* initCheck(): SagaIterator {
  try {
    const userData = yield call([AsyncStorage, 'getItem'], '@user:data');

    if (userData) {
      const user = JSON.parse(userData);

      const { token } = user;

      yield put(updateTokens(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      const requests = [getMe, getUsers];

      yield all(requests.map(r => call(r)));
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* getUsers(): SagaIterator {
  const response = yield call(api.get, 'users');

  yield put(addUsers(response.data));
}

export function* getMe(): SagaIterator {
  try {
    const response = yield call(api.get, 'profile');

    yield put(updateUser(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* signIn({ payload }: ReturnType<typeof signInRequest>): SagaIterator {
  try {
    yield put(setLoadingSingin(true));

    yield put(signInError({ error: false, messageError: '' }));

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
    sendError(error);
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

export default all([
  takeLatest('@user/SIGN_IN_REQUEST', signIn),
  takeLatest('@user/GET_ME_REQUEST', getMe),
]);
