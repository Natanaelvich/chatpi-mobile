import React, { useCallback, useRef, useState } from 'react';

import { Feather, MaterialIcons } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import {
  Container,
  Title,
  ReturnLoginContainer,
  ReturnLoginText,
  FormContainer,
  Button,
  ButtonText,
  ErrorLogin,
  ErrorLoginText,
  IconKey,
  IconMail,
  Input,
  InputContainer,
  Logo,
  IconUser,
} from './styles';

import api from '../../services/api';
import { LogoText } from '../SingnIn/styles';

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, sePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorSingnUp, setErrorSingnUp] = useState(false);

  const hanleSignUp = useCallback(async () => {
    try {
      setLoading(true);
      await api.post('users', {
        name,
        email,
        password,
      });
      setErrorSingnUp(false);
      navigation.navigate('SingnIn');
    } catch (error) {
      setErrorSingnUp(true);
    } finally {
      setLoading(false);
    }
  }, [name, email, password]);
  return (
    <Container>
      <FormContainer>
        <LogoText>Chat PI</LogoText>
        <Title>Faça seu cadastro</Title>

        {errorSingnUp && (
          <ErrorLogin>
            <MaterialIcons name="error" size={32} color="#E04848" />
            <ErrorLoginText>
              Falha ao se cadastrar, tente novamente mas tarde!
            </ErrorLoginText>
          </ErrorLogin>
        )}

        <InputContainer>
          <Input
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />

          <IconUser />
        </InputContainer>
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
            onChangeText={sePassword}
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={hanleSignUp}
            ref={passwordRef}
          />
          <IconKey />
        </InputContainer>

        <Button loading={loading} onPress={hanleSignUp}>
          <ButtonText>{loading ? 'Cadastrando...' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>
    </Container>
  );
};

export default SingnUp;
