import { combineReducers } from 'redux';

import user from './user/reducer';
import attendants from './attendants/reducer';

const rootReducer = combineReducers({
  user,
  attendants,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
