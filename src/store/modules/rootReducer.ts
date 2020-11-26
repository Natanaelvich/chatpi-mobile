import { combineReducers } from 'redux';

import user from './user/reducer';
import attendants from './attendants/reducer';
import messages from './messages/reducer';

const rootReducer = combineReducers({
  user,
  attendants,
  messages,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
