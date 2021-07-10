import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Updates from 'expo-updates';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import { RootState } from '../store/modules/rootReducer';
import { isConnected } from '../utils/netInfo';
import { UpdateContainer, UpdateText } from '../styles/global';

import { navigationRef } from '../services/rootNavigation';
import DrawerRoutes from './drawer';
import { AuthStackRoutes } from './authStack';

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

const Routes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

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
          {user ? <DrawerRoutes /> : <AuthStackRoutes />}
        </NavigationContainer>
      )}
    </>
  );
};

export default Routes;
