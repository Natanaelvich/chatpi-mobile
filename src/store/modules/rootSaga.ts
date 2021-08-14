/* eslint-disable import/no-extraneous-dependencies */
import { all } from 'redux-saga/effects';

import auth, { initCheck } from './auth/sagas';
import users from './users/sagas';
import messages from './messages/sagas';
import { startWatchingNetworkConnectivity } from './startWatchingNetworkConnectivity';

export default function* rootSaga(): Generator {
  return yield all([
    initCheck(),
    startWatchingNetworkConnectivity(),
    auth,
    users,
    messages,
  ]);
}
