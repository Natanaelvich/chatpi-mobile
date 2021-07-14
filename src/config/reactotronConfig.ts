import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reactotronSaga from 'reactotron-redux-saga';

// eslint-disable-next-line import/no-mutable-exports
let reactotron = null;

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];

  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'react-native',
      host: hostname,
      port: 9090,
    })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  console.tron = Reactotron.log;
}

export { reactotron };
