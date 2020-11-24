import React from 'react';
import {
  Container,
  Content,
  ContentTitle,
  Box,
  BoxAvatar,
  BoxDesc,
  BoxTitle,
  BoxTextContainer,
  ButtonNext,
  IconNext,
} from './styles';
import avatar from '../../assets/ovo.png';
import covid from '../../assets/covid.png';

const Attendants: React.FC = () => {
  return (
    <Container>
      <Content>
        <ContentTitle>Atendentes</ContentTitle>

        <Box>
          <BoxAvatar source={avatar} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Fulano</BoxTitle>
            <BoxDesc>Online</BoxDesc>
          </BoxTextContainer>

          <IconNext />
        </Box>

        <Box>
          <BoxAvatar source={covid} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Joao da Silva</BoxTitle>
            <BoxDesc>Offline</BoxDesc>
          </BoxTextContainer>

          <IconNext />
        </Box>

        <Box>
          <BoxAvatar source={avatar} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Paula</BoxTitle>
            <BoxDesc>Offline</BoxDesc>
          </BoxTextContainer>

          <IconNext />
        </Box>

        <Box>
          <BoxAvatar source={covid} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Joao da Silva</BoxTitle>
            <BoxDesc>Online</BoxDesc>
          </BoxTextContainer>

          <IconNext />
        </Box>
      </Content>
    </Container>
  );
};

export default Attendants;
