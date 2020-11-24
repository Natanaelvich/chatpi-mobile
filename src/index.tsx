import React from 'react';
import './config/reactotronConfig';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito';
import Routes from './routes';
import AppProvider from './hooks';

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default Main;
