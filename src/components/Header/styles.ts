import { Feather, MaterialCommunityIcons } from 'expo-vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px 12px;
  background: ${props => props.theme.colors.primary};
  border-color: #dde3f0;
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text`
  font-size: 23px;
  color: #fff;
  font-family: Redressed_400Regular;
`;
export const ButtonHeader = styled(BorderlessButton)``;
export const IconMenu = styled(MaterialCommunityIcons).attrs({
  name: 'menu',
  size: 24,
  color: '#8FA7B3',
})``;
export const IconUser = styled(Feather).attrs({
  name: 'user',
  size: 24,
  color: '#8FA7B3',
})``;
