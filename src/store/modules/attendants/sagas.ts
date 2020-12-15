import { all, takeLatest, put, call } from 'redux-saga/effects';
import { addAttendants, addUsers } from './actions';
import api from '../../../services/api';

export function* getAttendants() {
  try {
    const response = yield call(api.get, 'attendantes');

    yield put(addAttendants(response.data));
  } catch (error) {
    // if error 401 auto logout
  }
}

export function* getUsers() {
  try {
    const response = yield call(api.get, 'users');

    yield put(addUsers(response.data));
  } catch (error) {
    // if error 401 auto logout
  }
}

export default all([
  takeLatest('@attendants/GET_ATTENDANTS', getAttendants),
  takeLatest('@attendants/GET_USERS', getUsers),
]);
