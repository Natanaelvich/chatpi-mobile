import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (reducers: any): any => {
  const persistedReducer = persistReducer(
    {
      key: 'chatpi',
      storage: AsyncStorage,
      stateReconciler: autoMergeLevel2,
      debug: true,
      transforms: [
        createWhitelistFilter('user,', ['data']),
        createWhitelistFilter('attendants', ['attendants', 'users']),
        createWhitelistFilter('messages', []),
        createWhitelistFilter('options', []),
        createWhitelistFilter('socket', []),
        createWhitelistFilter('utils', []),
        createWhitelistFilter('offline', ['queue', 'isConnected']),
      ],
    },
    reducers,
  );

  return persistedReducer;
};