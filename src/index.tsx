import React from 'react';

import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';
import * as Sentry from '@sentry/react-native';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import OneSignal from 'react-native-onesignal';

import Routes from './routes';
import { persistor, store } from './store';
import GlobalStyles from './styles';
import env from '../env';

Sentry.init({
  dsn: env.SENTRY_DNS,
  debug: false,
  enabled: !__DEV__,
});

OneSignal.setAppId(env.ONESIGNAL_KEY);

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#343152" />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles>
            <Routes />
            <Toast ref={ref => Toast.setRef(ref)} />
          </GlobalStyles>
        </PersistGate>
      </Provider>
    </>
  );
};

export default Main;
