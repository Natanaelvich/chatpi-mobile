import React from 'react';

import './config/reactotronConfig';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';

import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import Header from './components/Header';
import { persistor, store } from './store';
import light from './styles/theme/light';

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={light}>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default Main;
