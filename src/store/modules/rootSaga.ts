/* eslint-disable import/no-extraneous-dependencies */
import { all } from 'redux-saga/effects';

import user, { initCheck } from './user/sagas';
import attendants from './attendants/sagas';

export default function* rootSaga(): Generator {
  return yield all([initCheck(), user, attendants]);
}
