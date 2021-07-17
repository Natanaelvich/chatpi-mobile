/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

import { addAttendants, addUsers } from './actions';
import api from '../../../services/api';
import { sendError } from '../../../services/sendError';

export function* getAttendants(): SagaIterator {
  try {
    const response = yield call(api.get, 'attendantes');

    yield put(addAttendants(response.data));
  } catch (error) {
    sendError(error);
    // if error 401 auto logout
  }
}

export function* getUsers(): SagaIterator {
  try {
    const response = yield call(api.get, 'users');

    yield put(addUsers(response.data));
  } catch (error) {
    sendError(error);
    // if error 401 auto logout
  }
}

export default all([
  takeLatest('@attendants/GET_ATTENDANTS', getAttendants),
  takeLatest('@attendants/GET_USERS', getUsers),
]);
