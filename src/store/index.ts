import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import AsyncStorage from '@react-native-community/async-storage';

import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import { reactotron } from '../config/reactotronConfig';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user', 'messages', 'attendants'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reactotronMiddleware = __DEV__ ? reactotron.createEnhancer() : null;

const sagaMiddleware = createSagaMiddleware();

const enhancer = __DEV__
  ? compose(reactotronMiddleware, applyMiddleware(sagaMiddleware))
  : applyMiddleware(sagaMiddleware);

const store = createStore(persistedReducer, enhancer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
