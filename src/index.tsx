import React from 'react';

import { Platform, StatusBar, UIManager } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';

import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import OneSignal from 'react-native-onesignal';
import Routes from './routes';
import { persistor, store } from './store';
import GlobalStyles from './styles';

const { ONESIGNAL_KEY } = process.env;
OneSignal.setAppId(ONESIGNAL_KEY as string);
OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
  const notif = notifReceivedEvent.getNotification();
  notifReceivedEvent.complete(notif);
});
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
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
