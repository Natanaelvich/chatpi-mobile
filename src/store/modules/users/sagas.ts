/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

import { addUsers, setLoading } from './actions';
import api from '../../../services/api';
import { sendError } from '../../../services/sendError';

export function* getUsers(): SagaIterator {
  try {
    yield put(setLoading(true));
    const response = yield call(api.get, 'users');

    yield put(addUsers(response.data));
  } catch (error) {
    sendError(error);
    // if error 401 auto logout
  } finally {
    yield put(setLoading(false));
  }
}

export default all([takeLatest('@users/GET_USERS', getUsers)]);
