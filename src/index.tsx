import React, { useCallback, useEffect, useState } from 'react';

import { Platform, StatusBar, UIManager, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';
import * as SplashScreen from 'expo-splash-screen';
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

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare(): Promise<void> {
      try {
        await SplashScreen.preventAutoHideAsync();
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#343152" />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles>
            <View
              onLayout={onLayoutRootView}
              style={{ backgroundColor: 'red' }}
            />
            <Routes />
            <Toast ref={ref => Toast.setRef(ref)} />
          </GlobalStyles>
        </PersistGate>
      </Provider>
    </>
  );
};

export default Main;
