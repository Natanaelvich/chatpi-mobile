import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent';
import { AppStackRoutes } from './appStack';

const Drawer = createDrawerNavigator();

const DrawerRoutes = (): JSX.Element => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={AppStackRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
