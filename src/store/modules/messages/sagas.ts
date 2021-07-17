/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, select, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import crashlytics from '@react-native-firebase/crashlytics';
import { updateMessageSended } from './actions';
import { RootState } from '../rootReducer';

type Params = { messageJsonString: string; type: string };

function* sendMessage({ messageJsonString }: Params): SagaIterator {
  try {
    const socket = yield select((state: RootState) => state.socket.socket);

    socket.emit('message', messageJsonString);

    const { idMessage } = JSON.parse(messageJsonString);

    yield put(updateMessageSended(idMessage));
  } catch (error) {
    crashlytics().recordError(error);
    // if error 401 auto logout
  }
}

export default all([takeLatest('@messages/SEND_MESSAGE', sendMessage)]);
