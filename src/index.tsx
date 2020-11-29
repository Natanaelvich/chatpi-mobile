import React from 'react';

import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';

import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes';
import { persistor, store } from './store';
import GlobalStyles from './styles';

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
          </GlobalStyles>
        </PersistGate>
      </Provider>
    </>
  );
};

export default Main;
