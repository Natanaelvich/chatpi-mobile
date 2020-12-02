import { Feather } from 'expo-vector-icons';
import React from 'react';
import { TextInputProps } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})`
  background: ${props => props.theme.colors.primary};
`;
export const LogoText = styled.Text`
  font-size: 43px;
  color: #fff;
  font-family: Redressed_400Regular;
  margin: 20px 0;
`;
export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
export const InputContainer = styled.View`
  width: 100%;
  height: 50px;

  flex-direction: row;
  align-items: center;

  background: #9c9ab1;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 8px;
  border-width: 1px;
  border-color: transparent;
`;
export const Input: React.FC<TextInputProps> = styled.TextInput.attrs(
  props =>
    ({
      placeholderTextColor: props.theme.colors.primary,
    } as TextInputProps),
)`
  color: ${props => props.theme.colors.primary};
  flex: 1;
  margin-left: 16px;
`;

export const IconMail = styled(Feather).attrs(props => ({
  name: 'mail',
  size: 23,
  color: props.theme.colors.primary,
}))``;
export const IconKey = styled(Feather).attrs(props => ({
  name: 'lock',
  size: 23,
  color: props.theme.colors.primary,
}))``;
export const Button = styled(RectButton)<RectButtonProperties>`
  background: #de595c;
  border-radius: 10px;
  height: 50px;

  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const ButtonText = styled.Text`
  font-size: 14px;
  line-height: 18px;

  color: #fff;
`;
export const Logo = styled.Image``;
export const Title = styled.Text`
  margin: 64px 0 24px;
  font-size: 24px;
  line-height: 26px;
  color: #f4ede8;
`;
export const ForgotPasswordButton = styled.TouchableWithoutFeedback``;
export const ForgotPassword = styled.Text`
  margin-top: 24px;
  font-size: 14px;
  line-height: 18px;
  color: #f4ede8;
`;
export const CreateAccountContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-top-width: 1px;
  border-color: #de595c;

  background: ${props => props.theme.colors.primary};
`;
export const CreateAccountText = styled.Text`
  font-size: 14px;
  line-height: 18px;
  margin-left: 18px;

  color: #de595c;
`;
export const ErrorLogin = styled.View`
  flex-direction: row;
  width: 80%;
  align-items: center;
  align-self: center;
  margin: 12px 0;
`;
export const ErrorLoginText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #e04848;
  margin-left: 6px;
`;
