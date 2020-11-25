import React, { useCallback, useRef, useState } from 'react';

import { Feather } from 'expo-vector-icons';

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import {
  Container,
  Logo,
  Title,
  ForgotPassword,
  CreateAccountContainer,
  CreateAccountText,
  ForgotPasswordButton,
  FormContainer,
  Input,
  ButtonText,
  Button,
  InputContainer,
  IconMail,
  IconKey,
  LogoText,
} from './styles';

import logo from '../../assets/Logo.png';

const SingnIn: React.FC = () => {
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hanleSignIn = useCallback(async () => {
    console.log(email, password);
  }, []);
  return (
    <>
      <Container>
        <FormContainer>
          <LogoText>Chat PI</LogoText>
          <Title>Faça seu logon</Title>

          <InputContainer>
            <Input
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <IconMail />
          </InputContainer>
          <InputContainer>
            <Input
              value={password}
              onChangeText={setPassword}
              ref={passwordRef}
              secureTextEntry
              placeholder="Senha"
              name="password"
              returnKeyType="send"
              onSubmitEditing={() => {
                hanleSignIn();
              }}
            />
            <IconKey />
          </InputContainer>

          <Button
            onPress={() => {
              hanleSignIn();
            }}
          >
            <ButtonText>Entrar</ButtonText>
          </Button>

          <ForgotPasswordButton>
            <ForgotPassword>Esqueci minha senha</ForgotPassword>
          </ForgotPasswordButton>
        </FormContainer>
        <CreateAccountContainer onPress={() => navigation.navigate('SingnUp')}>
          <Feather name="log-in" size={24} color="#de595c" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccountContainer>
      </Container>
    </>
  );
};

export default SingnIn;
