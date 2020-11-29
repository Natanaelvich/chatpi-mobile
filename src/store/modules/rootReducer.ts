import { combineReducers } from 'redux';

import user from './user/reducer';
import attendants from './attendants/reducer';
import messages from './messages/reducer';
import options from './options/reducer';

const rootReducer = combineReducers({
  user,
  attendants,
  messages,
  options,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
