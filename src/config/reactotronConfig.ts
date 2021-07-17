/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reactotronSaga from 'reactotron-redux-saga';

const { scriptURL } = NativeModules.SourceCode;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

if (Reactotron.setAsyncStorageHandler) {
  const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'react-native',
      host: hostname,
      port: 9090,
    })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga({ except: [''] }))
    .connect();

  console.tron = reactotron;
}
