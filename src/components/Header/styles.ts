import { MaterialCommunityIcons } from 'expo-vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px;
  background: #f9fafc;
  border-color: #dde3f0;
  padding-top: 44px;
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text`
  font-size: 15px;
  color: #8fa7b3;
  font-family: Nunito_400Regular;
`;
export const ButtonBack = styled(BorderlessButton)``;
export const ButtonClose = styled(BorderlessButton)``;
export const IconBack = styled(MaterialCommunityIcons).attrs({
  name: 'arrow-left',
  size: 24,
  color: '#15B6D6',
})``;
export const IconClose = styled(MaterialCommunityIcons).attrs({
  name: 'close',
  size: 24,
  color: '#8FA7B3',
})``;
