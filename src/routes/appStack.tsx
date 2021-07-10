import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import UserDetails from '../pages/UserDetails';
import MyTabs from './tabs';

const Stack = createStackNavigator();

export function AppStackRoutes(): JSX.Element {
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
