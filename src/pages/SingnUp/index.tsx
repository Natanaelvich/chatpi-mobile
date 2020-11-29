import React, { useRef } from 'react';

import { Feather } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import {
  Container,
  Title,
  ReturnLoginContainer,
  ReturnLoginText,
  FormContainer,
} from './styles';

import Input from '../../components/Input';

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const emailRef = useRef<TextInput>(null);

  // const hanleSignIn = useCallback(async () => {}, []);
  return (
    <Container>
      <FormContainer>
        <Title>Faça seu cadastro</Title>

        <Input
          autoCapitalize="words"
          placeholder="Nome"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="E-mail"
          returnKeyType="next"
        />
        <Input
          secureTextEntry
          placeholder="Senha"
          textContentType="newPassword"
          returnKeyType="send"
        />
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>
    </Container>
  );
};

export default SingnUp;
