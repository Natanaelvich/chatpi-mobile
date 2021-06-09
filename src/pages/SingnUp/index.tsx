import React, { useCallback, useRef, useState } from 'react';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';
import {
  LayoutAnimation,
  Platform,
  TextInputProps,
  UIManager,
} from 'react-native';
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
  IconUser,
  CheckBoxContainer,
  LabelCheckBox,
  Select,
  SelectContainer,
} from './styles';

import api from '../../services/api';
import { LogoText } from '../SingnIn/styles';
import ModalProVerification from './ModalProVerification';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, sePassword] = useState('');
  const [attendant, setAttendant] = useState(false);
  const [attendantType, setAttendantType] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorSingnUp, setErrorSingnUp] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const hanleSignUp = useCallback(async () => {
    try {
      setLoading(true);

      if (attendant && attendantType === '') {
        setErrorSingnUp(true);
        setMessageError('Selecione o tipo de atendente que você deseja ser.');
        return;
      }

      await api.post('users', {
        name,
        email,
        password,
        clerk: attendantType !== '' ? attendantType : null,
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
      setModalVisible(false);
    }
  }, [name, email, password, navigation, attendantType, attendant]);

  function handleOpenModal(): void {
    setModalVisible(true);
  }

  return (
    <Container>
      <FormContainer>
        <LogoText>Chat PI</LogoText>
        <Title>Faça seu cadastro</Title>

        {errorSingnUp && (
          <ErrorLogin>
            <MaterialIcons name="error" size={32} color="#E04848" />
            <ErrorLoginText>
              {messageError ||
                'Falha ao se cadastrar, tente novamente mas tarde!'}
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

        <CheckBoxContainer>
          <LabelCheckBox>Atendente</LabelCheckBox>
          <Checkbox
            disabled={false}
            value={attendant}
            onValueChange={e => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setAttendant(e);
            }}
            color="#DE595C"
          />
        </CheckBoxContainer>

        {attendant && (
          <SelectContainer>
            <Select
              selectedValue={attendantType}
              onValueChange={setAttendantType}
            >
              <Select.Item
                label="Selecione uma opção"
                value=""
                color="#343152"
              />
              <Select.Item label="Enfermeiro(a)" value="enf" color="#343152" />
              <Select.Item label="Psicólogo(a)" value="psic" color="#343152" />
            </Select>
          </SelectContainer>
        )}

        <Button loading={loading} onPress={handleOpenModal}>
          <ButtonText>{loading ? 'Cadastrando...' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>

      {modalVisible && (
        <ModalProVerification
          handleVerification={hanleSignUp}
          visible={modalVisible}
          changeSetVisible={setModalVisible}
        />
      )}
    </Container>
  );
};

export default SingnUp;
