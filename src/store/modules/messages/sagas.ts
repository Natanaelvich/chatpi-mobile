/* eslint-disable import/no-extraneous-dependencies */
import { all, takeLatest, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

import { updateMessageSended } from './actions';
import { sendError } from '../../../services/sendError';

type Params = {
  payload: { message: string; socket: SocketIOClient.Socket };
  type: string;
};

function* sendMessage({ payload: { message, socket } }: Params): SagaIterator {
  try {
    socket.emit('message', message);

    const { idMessage } = JSON.parse(message);

    yield put(updateMessageSended(idMessage));
  } catch (error) {
    sendError(error);
    // if error 401 auto logout
  }
}

export default all([takeLatest('@messages/SEND_MESSAGE', sendMessage)]);
