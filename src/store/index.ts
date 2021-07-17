/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';
import { persistStore, REHYDRATE } from 'redux-persist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

__DEV__ && require('../config/reactotronConfig');

const middlewares = [];
const sagaMiddleware = __DEV__
  ? createSagaMiddleware({ sagaMonitor: console.tron.createSagaMonitor() })
  : createSagaMiddleware();

middlewares.push(
  offlineMiddleware({
    additionalTriggers: REHYDRATE,
  }),
);
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const enhancer = __DEV__
  ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares);

const store = createStore(persistReducers(rootReducer), enhancer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
