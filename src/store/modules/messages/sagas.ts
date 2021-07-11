/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import crashlytics from '@react-native-firebase/crashlytics';

import api from '../../../services/api';
import { addAttendants } from '../attendants/actions';

export function* sendMessage(): SagaIterator {
  try {
    const response = yield call(api.get, 'attendantes');

    yield put(addAttendants(response.data));
  } catch (error) {
    crashlytics().recordError(error);
    // if error 401 auto logout
  }
}

export default all([takeLatest('@messages/SEND_MESSAGE', sendMessage)]);
