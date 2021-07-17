/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, select, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

import { updateMessageSended } from './actions';
import { RootState } from '../rootReducer';
import { sendError } from '../../../services/sendError';

type Params = { messageJsonString: string; type: string };

function* sendMessage({ messageJsonString }: Params): SagaIterator {
  try {
    const socket = yield select((state: RootState) => state.socket.socket);

    socket.emit('message', messageJsonString);

    const { idMessage } = JSON.parse(messageJsonString);

    yield put(updateMessageSended(idMessage));
  } catch (error) {
    sendError(error);
    // if error 401 auto logout
  }
}

export default all([takeLatest('@messages/SEND_MESSAGE', sendMessage)]);
