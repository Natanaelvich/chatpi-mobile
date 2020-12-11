import { combineReducers } from 'redux';

import user from './user/reducer';
import attendants from './attendants/reducer';
import messages from './messages/reducer';
import options from './options/reducer';
import socket from './socket/reducer';
import utils from './utils/reducer';

const rootReducer = combineReducers({
  user,
  attendants,
  messages,
  options,
  socket,
  utils,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
