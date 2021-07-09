import { put, take } from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import { OFFLINE, ONLINE } from 'redux-offline-queue';
import { eventChannel, SagaIterator } from 'redux-saga';

export function* startWatchingNetworkConnectivity(): SagaIterator {
  const channel = eventChannel(emitter => {
    const addEventListener = NetInfo.addEventListener(state => {
      emitter(state.isConnected);
    });
    return () => addEventListener();
  });
  try {
    while (true) {
      const isConnected = yield take(channel);
      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
