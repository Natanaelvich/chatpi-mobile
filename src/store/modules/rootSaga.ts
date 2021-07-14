/* eslint-disable import/no-extraneous-dependencies */
import { all } from 'redux-saga/effects';

import auth, { initCheck } from './auth/sagas';
import attendants from './attendants/sagas';
import { startWatchingNetworkConnectivity } from './startWatchingNetworkConnectivity';

export default function* rootSaga(): Generator {
  return yield all([
    initCheck(),
    startWatchingNetworkConnectivity(),
    auth,
    attendants,
  ]);
}
