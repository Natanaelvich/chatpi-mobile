import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';

import { Container, Title, ButtonHeader, IconMenu, IconUser } from './styles';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return null;
  }
  return (
    <Container>
      <ButtonHeader>
        <IconMenu />
      </ButtonHeader>
      <Title>Chat PI</Title>

      <ButtonHeader>
        <IconUser />
      </ButtonHeader>
    </Container>
  );
};

export default Header;
