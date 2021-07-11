/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import crashlytics from '@react-native-firebase/crashlytics';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';

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
// import { database, ModelMessage } from '../../database';

const SingnIn: React.FC = () => {
  const dispatch = useDispatch();
  const passwordRef = useRef<TextInput>();
  const navigation = useNavigation();

  const { signinError, loadingSingin } = useSelector(
    (state: RootState) => state.user,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const loadMessages = async (): Promise<void> => {
  //   const messageCollection = database.get<ModelMessage>('messages');
  //   const messages = await messageCollection.query().fetch();

  //   console.tron(messages);
  // };

  // useEffect(() => {
  //   loadMessages();
  // }, []);

  useEffect(() => {
    if (__DEV__) {
      setEmail('taelima1997@gmail.com');
      setPassword('123123');
    }
  }, []);

  const hanleSignIn = useCallback(async () => {
    await crashlytics().setAttributes({
      email,
    });

    dispatch(signInRequest(email, password));
  }, [email, password, dispatch]);

  // async function handleCreateMessage(): Promise<void> {
  //   try {
  //     const messageCollection = database.get<ModelMessage>('messages');

  //     await database.action(async () => {
  //       await messageCollection.create(newMessage => {
  //         newMessage.user = '12312asdasdasd12313';
  //         newMessage.toUser = '123123asdadasdads123123';
  //         newMessage.message = 'OLAAAAAAAAAAAAAAAAAAAA';
  //         newMessage.readed = 'true';
  //         newMessage.date = new Date();
  //         newMessage.name = 'que';
  //       });
  //     });
  //   } catch (error) {
  //     console.tron(error);
  //   }
  // }
  // function handleLoadMessages(): void {
  //   loadMessages();
  // }
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
      {/* <Button onPress={handleCreateMessage} loading={false}>
        <ButtonText>Create message</ButtonText>
      </Button>
      <Button onPress={handleLoadMessages} loading={false}>
        <ButtonText>Load messages</ButtonText>
      </Button> */}
      <CreateAccountContainer onPress={() => navigation.navigate('SingnUp')}>
        <Feather name="log-in" size={24} color="#de595c" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountContainer>
    </Container>
  );
};

export default SingnIn;
