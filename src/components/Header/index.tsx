import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';

import {
  Container,
  Title,
  ButtonBack,
  ButtonClose,
  IconBack,
  IconClose,
} from './styles';

interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <Container>
      <ButtonBack onPress={() => navigation.goBack()}>
        <IconBack />
      </ButtonBack>
      <Title>{title}</Title>
      <ButtonClose
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
      >
        <IconClose />
      </ButtonClose>
    </Container>
  );
};

export default Header;
