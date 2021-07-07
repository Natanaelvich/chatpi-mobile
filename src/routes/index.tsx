import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Updates from 'expo-updates';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Sentry from '@sentry/react-native';

import MyTabs from './tabs';
import SingnIn from '../pages/SingnIn';
import { RootState } from '../store/modules/rootReducer';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import UserDetails from '../pages/UserDetails';
import { isConnected } from '../utils/netInfo';
import { UpdateContainer, UpdateText } from '../styles/global';

import DrawerContent from '../components/DrawerContent';
import SingnUp from '../pages/SingnUp';
import ForgotPassword from '../pages/ForgotPassword';
import { navigationRef } from '../services/rootNavigation';

const reactNavigationV5Instrumentation = new Sentry.ReactNavigationV5Instrumentation(
  {
    routeChangeTimeoutMs: 500,
  },
);

const { SENTRY_DNS } = process.env;

Sentry.init({
  dsn: SENTRY_DNS,
  debug: false,
  tracesSampleRate: 1.0,
  autoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,

  integrations: [
    new Sentry.ReactNativeTracing({
      idleTimeout: 5000,
      routingInstrumentation: reactNavigationV5Instrumentation,
      tracingOrigins: ['localhost', /^\//, /^https:\/\//],
    }),
  ],

  // enabled: !__DEV__,
});

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  function Stacks(): JSX.Element {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#343152' },
        }}
      >
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    );
  }

  const [loadingUpdate, setLoadingUpdate] = useState(false);

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
      {loadingUpdate && !__DEV__ ? (
        <UpdateContainer>
          <UpdateText>Atualizando...</UpdateText>
          <ActivityIndicator size="large" color="#343152" />
        </UpdateContainer>
      ) : (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            reactNavigationV5Instrumentation.registerNavigationContainer(
              navigationRef,
            );
          }}
        >
          {user ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Main" component={Stacks} />
            </Drawer.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#343152' },
              }}
            >
              <Stack.Screen name="SingnIn" component={SingnIn} />
              <Stack.Screen name="SingnUp" component={SingnUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
};

export default Routes;
