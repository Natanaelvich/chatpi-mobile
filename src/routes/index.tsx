import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabs';
import SingnIn from '../pages/SingnIn';
import { RootState } from '../store/modules/rootReducer';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';

const Stack = createStackNavigator();
const Routes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
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
  );
};

export default Routes;
