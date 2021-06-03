import { NativeModules } from 'react-native';

export default function getIPhost(): string {
  let hostname = 'localhost';

  if (__DEV__) {
    const { scriptURL } = NativeModules.SourceCode;
    const address = scriptURL.split('://')[1].split('/')[0];
    [hostname] = address.split(':');
  }

  return hostname;
}
