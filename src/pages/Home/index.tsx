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
  BoxCircle,
  BoxCircleText,
} from './styles';
import avatar from '../../assets/ovo.png';
import covid from '../../assets/covid.png';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <ContentTitle>Conversas</ContentTitle>

        <Box>
          <BoxAvatar source={avatar} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Fulano</BoxTitle>
            <BoxDesc>Digitando...</BoxDesc>
          </BoxTextContainer>

          <BoxCircle>
            <BoxCircleText>2</BoxCircleText>
          </BoxCircle>
        </Box>

        <Box>
          <BoxAvatar source={covid} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Joao da Silva</BoxTitle>
            <BoxDesc>ksksks</BoxDesc>
          </BoxTextContainer>

          <BoxCircle>
            <BoxCircleText>2</BoxCircleText>
          </BoxCircle>
        </Box>

        <Box>
          <BoxAvatar source={avatar} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Paula </BoxTitle>
            <BoxDesc>rsrsrssr</BoxDesc>
          </BoxTextContainer>

          <BoxCircle>
            <BoxCircleText>2</BoxCircleText>
          </BoxCircle>
        </Box>

        <Box>
          <BoxAvatar source={covid} resizeMode="cover" />
          <BoxTextContainer>
            <BoxTitle>Joao da Silva</BoxTitle>
            <BoxDesc>ksksks</BoxDesc>
          </BoxTextContainer>

          <BoxCircle>
            <BoxCircleText>2</BoxCircleText>
          </BoxCircle>
        </Box>
      </Content>
    </Container>
  );
};

export default Home;
