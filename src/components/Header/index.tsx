import React from 'react';

import { Container, Title, ButtonHeader, IconMenu, IconUser } from './styles';

const Header: React.FC = () => {
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
