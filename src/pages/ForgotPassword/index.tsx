import React, { useCallback, useState } from 'react';

import { Feather, MaterialIcons } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
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
  IconMail,
  Input,
  InputContainer,
} from './styles';

import api from '../../services/api';
import { LogoText } from '../SingnIn/styles';

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorSingnUp, setErrorSingnUp] = useState(false);

  const hanleSignUp = useCallback(async () => {
    try {
      setLoading(true);
      await api.post('password/rese', {
        email,
      });
      setErrorSingnUp(false);
      navigation.navigate('SingnIn');
      Toast.show({
        text1: 'Parabéns',
        text2: 'Seu cadastro foi realizado com sucesso 🎉🎉',
        visibilityTime: 3000,
        type: 'success',
      });
    } catch (error) {
      setErrorSingnUp(true);
    } finally {
      setLoading(false);
    }
  }, [email, navigation]);
  return (
    <Container>
      <FormContainer>
        <LogoText>Chat PI</LogoText>
        <Title>Faça seu cadastro</Title>

        {errorSingnUp && (
          <ErrorLogin>
            <MaterialIcons name="error" size={32} color="#E04848" />
            <ErrorLoginText>
              Falha ao enviar email, tente novamente mas tarde!
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
          />
          <IconMail />
        </InputContainer>

        <Button loading={loading} onPress={hanleSignUp}>
          <ButtonText>{loading ? 'Enviando...' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>
    </Container>
  );
};

export default ForgotPassword;
