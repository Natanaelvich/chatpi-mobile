import { all, takeLatest, put, call } from 'redux-saga/effects';
import { addAttendants } from './actions';
import api from '../../../services/api';

export function* getAttendants() {
  try {
    const response = yield call(api.get, 'users');

    yield put(addAttendants(response.data));
  } catch (error) {
    // if error 401 auto logout
  }
}

export default all([takeLatest('@attendants/GET_ATTENDANTS', getAttendants)]);
