import React from 'react';
import './config/reactotronConfig';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';

import Routes from './routes';
import Header from './components/Header';

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Header />
      <Routes />
    </>
  );
};

export default Main;
