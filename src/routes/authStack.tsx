import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingnIn from '../pages/SingnIn';
import SingnUp from '../pages/SingnUp';
import { ForgotPassword } from '../pages/SingnIn/styles';

const Stack = createStackNavigator();

export function AuthStackRoutes(): JSX.Element {
  return (
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
  );
}
