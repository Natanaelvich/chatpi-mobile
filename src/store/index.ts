import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import { reactotron } from '../config/reactotronConfig';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user', 'messages', 'attendants', 'options'],
};

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reactotronMiddleware = __DEV__ ? reactotron.createEnhancer() : null;

const enhancer = __DEV__
  ? compose(reactotronMiddleware, applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares);

const store = createStore(persistedReducer, enhancer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
