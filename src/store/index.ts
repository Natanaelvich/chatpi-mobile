import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';
import { persistStore } from 'redux-persist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

import { reactotron } from '../config/reactotronConfig';

const reactotronMiddleware = __DEV__ ? reactotron.createEnhancer() : null;

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const enhancer = __DEV__
  ? compose(reactotronMiddleware, applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares);

const store = createStore(persistReducers(rootReducer), enhancer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
