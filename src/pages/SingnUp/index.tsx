import React, { useCallback, useRef, useState } from 'react';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import { LayoutAnimation, TextInput } from 'react-native';
import { Formik } from 'formik';

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
  MessageErrorValidation,
} from './styles';

import api from '../../services/api';
import { LogoText } from '../SingnIn/styles';
import ModalProVerification from './ModalProVerification';
import { getSchema } from './shemas/ValidationSchema';

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [attendant, setAttendant] = useState(false);
  const [attendantType, setAttendantType] = useState('');
  const [errorValidationAttendant, setErrorValidationAttendant] = useState({
    error: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorSingnUp, setErrorSingnUp] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [valuesForm, setValuesForm] = useState();

  const hanleSignUp = useCallback(async () => {
    try {
      setLoading(true);

      const {
        name,
        email,
        password,
        attedantType: attedantTypeForm,
      } = valuesForm as any;

      await api.post('users', {
        name,
        email,
        password,
        clerk: attedantTypeForm || null,
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
  }, [valuesForm, navigation]);

  function validationAttendant(): boolean {
    if (attendant && !attendantType) {
      setErrorValidationAttendant({
        error: true,
        message: 'Tipo de atendente é obrigatório',
      });
      return false;
    }
    setErrorValidationAttendant({
      error: false,
      message: '',
    });
    return true;
  }

  function handleSave(values: any): void {
    setValuesForm({ ...values, attendantType });
  }
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
              Falha ao se cadastrar, tente novamente mas tarde!
            </ErrorLoginText>
          </ErrorLogin>
        )}

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSave}
          validationSchema={getSchema()}
        >
          {({
            values,
            handleChange,
            errors,
            handleSubmit,
            touched,
            isValid,
          }) => (
            <>
              <InputContainer error={!!touched.name && !!errors.name}>
                <Input
                  value={values.name}
                  onChangeText={handleChange('name')}
                  autoCapitalize="words"
                  placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />

                <IconUser />
              </InputContainer>
              <MessageErrorValidation>
                {!!touched.name && errors?.name}
              </MessageErrorValidation>
              <InputContainer error={!!touched.email && !!errors.email}>
                <Input
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="E-mail"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <IconMail />
              </InputContainer>
              <MessageErrorValidation>
                {!!touched.email && errors?.email}
              </MessageErrorValidation>
              <InputContainer error={!!touched.password && !!errors.password}>
                <Input
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  placeholder="Senha"
                  returnKeyType="send"
                  // onSubmitEditing={hanleSignUp}
                  ref={passwordRef}
                />
                <IconKey />
              </InputContainer>
              <MessageErrorValidation>
                {!!touched.password && errors?.password}
              </MessageErrorValidation>

              <CheckBoxContainer>
                <LabelCheckBox>Atendente</LabelCheckBox>
                <Checkbox
                  disabled={false}
                  value={attendant}
                  onValueChange={e => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setAttendant(e);
                  }}
                  tintColors={{ true: '#DE595C' }}
                />
              </CheckBoxContainer>

              {attendant && (
                <>
                  <SelectContainer error={errorValidationAttendant.error}>
                    <Select
                      selectedValue={attendantType}
                      onValueChange={(value, _) => {
                        setAttendantType(value as string);
                      }}
                    >
                      <Select.Item
                        label="Selecione uma opção"
                        value=""
                        color="#343152"
                      />
                      <Select.Item
                        label="Enfermeiro(a)"
                        value="enf"
                        color="#343152"
                      />
                      <Select.Item
                        label="Psicólogo(a)"
                        value="psic"
                        color="#343152"
                      />
                    </Select>
                  </SelectContainer>
                  <MessageErrorValidation>
                    {errorValidationAttendant.error &&
                      errorValidationAttendant.message}
                  </MessageErrorValidation>
                </>
              )}

              <Button
                loading={loading}
                onPress={() => {
                  const attenndantIsValid = validationAttendant();
                  handleSubmit();

                  if (attenndantIsValid && isValid) {
                    handleOpenModal();
                  }
                }}
              >
                <ButtonText>
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </ButtonText>
              </Button>
            </>
          )}
        </Formik>
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
