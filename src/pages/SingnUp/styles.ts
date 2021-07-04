import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps extends RectButtonProperties {
  loading: boolean;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})`
  background: ${props => props.theme.colors.primary};
`;
export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(40)}px;
`;
export const Logo = styled.Image``;
export const Title = styled.Text`
  margin: ${RFValue(64)}px 0 ${RFValue(24)}px;
  font-size: ${RFValue(24)}px;
  line-height: ${RFValue(26)}px;
  color: #f4ede8;
`;
export const ReturnLoginContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${RFValue(60)}px;
  border-top-width: ${RFValue(1)}px;
  border-color: ${props => props.theme.colors.backgroundButton};
  background: ${props => props.theme.colors.primary};
`;
export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${RFValue(12)}px;
`;
export const LabelCheckBox = styled.Text`
  ${props => props.theme.typograph.textH1Normal}
  color: #f4ede8;
  font-size: ${RFValue(18)}px;
  margin-right: ${RFValue(6)}px;
  letter-spacing: ${RFValue(0.89)}px;
`;
export const SelectContainer = styled.View<{ error: boolean }>`
  width: 100%;
  height: ${RFValue(50)}px;
  background: #9c9ab1;
  color: #f00;
  border-radius: ${RFValue(12)}px;
  justify-content: center;

  ${({ error }) =>
    error &&
    css`
      border-width: 2px;
      border-color: ${({ theme }) => theme.colors.danger};
    `}
`;
export const Select = styled(Picker)`
  flex: 1;
`;
export const ReturnLoginText = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;
  margin-left: ${RFValue(18)}px;

  color: #fff;
`;
export const Button = styled(RectButton)<ButtonProps>`
  background: ${props => (props.loading ? '#C44F51' : '#de595c')};
  border-radius: ${RFValue(10)}px;
  height: ${RFValue(50)}px;

  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${RFValue(6)}px;
`;
export const ButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;

  color: #fff;
`;

export const ErrorLogin = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin: ${RFValue(12)}px 0;
`;
export const ErrorLoginText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: ${RFValue(12)}px;
  color: #e04848;
  margin-left: ${RFValue(6)}px;
`;
export const InputContainer = styled.View<{ error: boolean }>`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;

  background: #9c9ab1;
  border-radius: ${RFValue(10)}px;

  padding: 0 ${RFValue(8)}px 0 0;
  border-width: ${RFValue(1)}px;
  border-color: transparent;

  ${({ error }) =>
    error &&
    css`
      border-width: 2px;
      border-color: ${({ theme }) => theme.colors.danger};
    `}
`;
export const Input = styled.TextInput.attrs(
  props =>
    ({
      placeholderTextColor: props.theme.colors.primary,
    } as TextInputProps),
)`
  color: ${props => props.theme.colors.primary};
  flex: 1;
  margin-left: ${RFValue(16)}px;
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
export const IconUser = styled(Feather).attrs(props => ({
  name: 'user',
  size: 23,
  color: props.theme.colors.primary,
}))``;

export const MessageErrorValidation = styled.Text`
  margin-bottom: ${RFValue(4)}px;
  align-self: flex-start;
  padding-left: ${RFValue(16)}px;
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.danger};
`;
