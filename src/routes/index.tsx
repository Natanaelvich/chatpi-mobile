import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Updates from 'expo-updates';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabs';
import SingnIn from '../pages/SingnIn';
import { RootState } from '../store/modules/rootReducer';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import { isConnected } from '../utils/netInfo';
import { UpdateContainer, UpdateText } from '../styles/global';

const Stack = createStackNavigator();
const Routes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [loadingUpdate, setLoadingUpdate] = useState(true);

  useEffect(() => {
    async function getUpdates(): Promise<void> {
      try {
        const connection = await isConnected();
        if (!connection) {
          return;
        }
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          setLoadingUpdate(true);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } finally {
        setLoadingUpdate(false);
      }
    }
    if (!__DEV__) {
      getUpdates();
    }
  }, []);

  return (
    <>
      {loadingUpdate && __DEV__ ? (
        <UpdateContainer>
          <UpdateText>Atualizando...</UpdateText>
          <ActivityIndicator size="large" color="#343152" />
        </UpdateContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#f2f3f5' },
            }}
          >
            {user ? (
              <>
                <Stack.Screen name="MyTabs" component={MyTabs} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Chat" component={Chat} />
              </>
            ) : (
              <Stack.Screen name="SingnIn" component={SingnIn} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default Routes;
