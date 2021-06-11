import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import {  TextInputProps } from 'react-native';
import {
  Container,
  Title,
  ForgotPassword,
  CreateAccountContainer,
  CreateAccountText,
  ForgotPasswordButton,
  FormContainer,
  ButtonText,
  Button,
  InputContainer,
  IconMail,
  IconKey,
  LogoText,
  ErrorLogin,
  ErrorLoginText,
  Input,
} from './styles';
import { signInRequest } from '../../store/modules/user/actions';
import { RootState } from '../../store/modules/rootReducer';

const SingnIn: React.FC = () => {
  const dispatch = useDispatch();
  const passwordRef = useRef());
  const navigation = useNavigation();

  const { signinError, loadingSingin } = useSelector(
    (state: RootState) => state.user,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (__DEV__) {
      // setEmail('hehe22@gmail.com');
      // setPassword('123456');
      setEmail('teste@teste.com');
      setPassword('123123');
    }
  }, []);

  const hanleSignIn = useCallback(async () => {
    dispatch(signInRequest(email, password));
  }, [email, password, dispatch]);

  return (
    <Container>
      <FormContainer>
        <LogoText>Chat PI</LogoText>
        <Title>Faça seu logon</Title>

        {signinError && (
          <ErrorLogin>
            <MaterialIcons name="error" size={32} color="#E04848" />
            <ErrorLoginText>
              Usuário ou senha incorretos, verifique e tente novamente!
            </ErrorLoginText>
          </ErrorLogin>
        )}

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
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={() => {
              hanleSignIn();
            }}
            ref={passwordRef as any}
          />
          <IconKey />
        </InputContainer>

        <Button
          onPress={() => {
            hanleSignIn();
          }}
          loading={loadingSingin}
        >
          <ButtonText>{loadingSingin ? 'Entrando...' : 'Entrar'}</ButtonText>
        </Button>

        <ForgotPasswordButton
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <ForgotPassword>Esqueci minha senha</ForgotPassword>
        </ForgotPasswordButton>
      </FormContainer>
      <CreateAccountContainer onPress={() => navigation.navigate('SingnUp')}>
        <Feather name="log-in" size={24} color="#de595c" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountContainer>
    </Container>
  );
};

export default SingnIn;
