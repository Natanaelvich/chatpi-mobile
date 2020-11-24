import { MaterialCommunityIcons, MaterialIcons } from 'expo-vector-icons';
import {
  ImageBackgroundProps,
  ImageProps,
  StyleSheet,
  TextInputProps,
  TextProps,
  ViewProps,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container: React.FC<ImageBackgroundProps> = styled.ImageBackground`
  position: relative;
  flex: 1;
`;
export const Logo: React.FC<ImageProps> = styled.Image`
  align-self: center;
  height: 100px;
  width: 100px;
  margin-bottom: 12px;
`;
export const StateCityContainer: React.FC<ViewProps> = styled.View`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 999;
  flex-direction: row;
  align-items: center;
`;
export const StateCity: React.FC<TextProps> = styled.Text`
  font-family: Nunito_700Bold;
  color: #0089a5;
  font-size: 14px;
  margin-right: 6px;
`;
export const ButtonEditStateCity = styled(BorderlessButton)``;
export const IconEdit = styled(MaterialIcons).attrs({
  name: 'edit',
  size: 24,
  color: '#0089a5',
})``;
export const CalloutContainer: React.FC<ViewProps> = styled.View`
  flex-direction: row;
  width: 160px;
  height: 46px;
  justify-content: space-between;
  padding: 12px;
  background: #fff;
  align-items: center;
  border-width: 1px;
  border-color: #0089a5;
  border-radius: 6px;
`;
export const CalloutText: React.FC<TextProps> = styled.Text`
  font-family: Nunito_700Bold;
  color: #0089a5;
  font-size: 14px;
`;
export const CalloutIconButton = styled(MaterialCommunityIcons).attrs({
  name: 'arrow-right',
  size: 24,
  color: '#0089a5',
})``;
export const Footer: React.FC<ViewProps> = styled.View`
  position: absolute;
  height: 56px;
  bottom: 12px;
  z-index: 999;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 20px;
  width: 80%;
  align-self: center;
  elevation: 2;
`;
export const FooterText: React.FC<TextProps> = styled.Text`
  font-family: Nunito_700Bold;
  font-size: 15px;
  color: #8fa7b3;
  margin-left: 24px;
`;
export const CreateOrphanageButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  background: #15c3d6;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
export const PlusIcon = styled(MaterialCommunityIcons).attrs({
  name: 'plus',
  size: 31,
  color: '#fff',
})``;
export const Form: React.FC<ViewProps> = styled.View`
  padding: 0 40px;
  justify-content: center;
  flex: 1;
`;
export const Label: React.FC<TextProps> = styled.TextInput`
  font-family: Nunito_700Bold;
  font-size: 15px;
  color: #8fa7b3;
  margin-bottom: 12px;
`;
export const Input: React.FC<TextInputProps> = styled.TextInput`
  height: 56px;
  background: #fff;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: #15c3d6;
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 0 12px;
`;
export const ButtonSubmit = styled(RectButton)`
  height: 56px;
  background: #15c3d6;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;
export const ButtonSubmitText: React.FC<TextProps> = styled.Text`
  font-family: Nunito_400Regular;
  font-size: 15px;
  color: #fff;
`;
