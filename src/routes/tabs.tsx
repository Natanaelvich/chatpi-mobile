import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '../pages/Home';
import Tab from '../components/Tab';
import Attendants from '../pages/Attendants';

const TabNavigator = createMaterialTopTabNavigator();

const MyTabs: React.FC = () => {
  return (
    <TabNavigator.Navigator
      initialRouteName="DadosImovel"
      tabBar={(props: MaterialTopTabBarProps) => <Tab {...props} />}
    >
      <TabNavigator.Screen name="Conversas" component={Home} />
      <TabNavigator.Screen name="Atendentes" component={Attendants} />
    </TabNavigator.Navigator>
  );
};

export default MyTabs;
