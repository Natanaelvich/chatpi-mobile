/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';

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
import { signInRequest } from '../../store/modules/auth/actions';
import { RootState } from '../../store/modules/rootReducer';
// import { database, ModelMessage } from '../../database';

const SingnIn: React.FC = () => {
  const dispatch = useDispatch();
  const passwordRef = useRef<TextInput>();
  const navigation = useNavigation();

  const { signinError, loadingSingin } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (__DEV__) {
      setEmail('taelima1997@gmail.com');
      setPassword('1231233');
    }
  }, []);

  const hanleSignIn = useCallback(async () => {
    dispatch(signInRequest(email, password));
  }, [email, password, dispatch]);

  return (
    <Container>
      <FormContainer>
        <MotiView
          from={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 3000,
          }}
        >
          <LogoText>Chat PI</LogoText>
        </MotiView>
        <Title>Faça seu logon</Title>

        <AnimatePresence exitBeforeEnter>
          {signinError.error && (
            <MotiView
              from={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 70,
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                type: 'timing',
                duration: 600,
              }}
            >
              <ErrorLogin>
                <MaterialIcons name="error" size={32} color="#E04848" />
                <ErrorLoginText>{signinError.messageError}</ErrorLoginText>
              </ErrorLogin>
            </MotiView>
          )}
        </AnimatePresence>

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
