import { combineReducers } from 'redux';
import { reducer as offline } from 'redux-offline-queue';
import auth from './auth/reducer';
import attendants from './attendants/reducer';
import messages from './messages/reducer';
import options from './options/reducer';
import socket from './socket/reducer';
import utils from './utils/reducer';

const rootReducer = combineReducers({
  attendants,
  messages,
  options,
  socket,
  utils,
  offline,
  auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
