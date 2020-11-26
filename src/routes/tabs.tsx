import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '../pages/Home';
import Tab from '../components/Tab';
import Attendants from '../pages/Attendants';
import Header from '../components/Header';

const TabNavigator = createMaterialTopTabNavigator();

const MyTabs: React.FC = () => {
  return (
    <>
      <Header />
      <TabNavigator.Navigator
        tabBar={(props: MaterialTopTabBarProps) => <Tab {...props} />}
      >
        <TabNavigator.Screen name="Conversas" component={Home} />
        <TabNavigator.Screen name="Atendentes" component={Attendants} />
      </TabNavigator.Navigator>
    </>
  );
};

export default MyTabs;
