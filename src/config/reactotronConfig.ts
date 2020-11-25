import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

let tron: Reactotron;
if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];

  tron = Reactotron.configure({
    name: 'react-native',
    host: hostname,
    port: 9090,
  })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

  if (tron.clear) {
    tron.clear();
  }
}
export default tron;
