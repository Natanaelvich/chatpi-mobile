import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';

import { Container, Title, ButtonHeader, IconMenu, IconUser } from './styles';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  if (!user) {
    return null;
  }
  return (
    <Container>
      <ButtonHeader
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <IconMenu />
      </ButtonHeader>
      <Title>Chat PI</Title>

      <ButtonHeader onPress={() => navigation.navigate('Profile')}>
        <IconUser />
      </ButtonHeader>
    </Container>
  );
};

export default Header;
