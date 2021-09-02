import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
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
export const LogoText = styled.Text`
  font-size: ${RFValue(43)}px;
  color: #fff;
  font-family: Redressed_400Regular;
  margin: ${RFValue(20)}px 0;
`;
export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
export const InputContainer = styled.View`
  width: 100%;
  height: 50px;
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;

  background: #9c9ab1;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(8)}px;
  padding: 0 ${RFValue(8)}px;
  border-width: ${RFValue(1)}px;
  border-color: transparent;
`;
export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.primary,
}))`
  color: ${props => props.theme.colors.primary};
  flex: 1;
  margin-left: ${RFValue(16)}px;
  font-size: ${RFValue(16)}px;
`;

export const IconMail = styled(Feather).attrs(props => ({
  name: 'mail',
  size: RFValue(23),
  color: props.theme.colors.primary,
}))``;
export const IconKey = styled(Feather).attrs(props => ({
  name: 'lock',
  size: RFValue(23),
  color: props.theme.colors.primary,
}))``;
export const Button = styled(RectButton)<ButtonProps>`
  background: ${props => (props.loading ? '#C44F51' : '#de595c')};
  border-radius: 10px;
  height: ${RFValue(50)}px;

  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const ButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;

  color: #fff;
`;
export const Logo = styled.Image``;
export const Title = styled.Text`
  margin: ${RFValue(64)}px 0 ${RFValue(24)}px;
  font-size: ${RFValue(24)}px;
  line-height: ${RFValue(26)}px;
  color: #f4ede8;
`;
export const ForgotPasswordButton = styled.TouchableWithoutFeedback``;
export const ForgotPassword = styled.Text`
  margin-top: ${RFValue(24)}px;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;
  color: #f4ede8;
`;
export const CreateAccountContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${RFValue(60)}px;
  border-top-width: ${RFValue(1)}px;
  border-color: #de595c;

  background: ${props => props.theme.colors.primary};
`;
export const CreateAccountText = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;
  margin-left: ${RFValue(18)}px;

  color: #de595c;
`;
export const ErrorLogin = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin: ${RFValue(12)}px 0 0 ${RFValue(12)}px;
`;
export const ErrorLoginText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: ${RFValue(12)}px;
  color: #e04848;
  margin-left: ${RFValue(6)}px;
`;
