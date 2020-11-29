import { MaterialIcons } from 'expo-vector-icons';
import {
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.colors.background};
`;
export const AvatarContainer = styled.View`
  elevation: 10;
  margin-top: 34px;
`;
export const Avatar: React.FC<ImageProps> = styled.Image`
  width: 124px;
  height: 124px;
  border-radius: 65px;

  border-width: 4px;
  border-color: ${props => props.theme.colors.text};
`;
export const DescContainer = styled.View`
  flex: 1;
  margin-top: 50px;
  align-items: center;
`;
export const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  color: #b5b5b5;
`;
export const Desc = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;

  color: ${props => props.theme.colors.text};
  margin-bottom: 12px;
`;
export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
export const ButtonToEditUser: React.FC<TouchableOpacityProps> = styled(
  TouchableOpacity,
)`
  flex-direction: row;
  align-items: center;
`;
export const ButtonToEditText: React.FC = styled.Text`
  color: ${props => props.theme.colors.text};
  margin-right: 12px;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
`;
export const ButtonLogout: React.FC<BorderlessButtonProperties> = styled(
  BorderlessButton,
)`
  width: 55px;
  height: 55px;

  align-items: center;
  justify-content: center;

  background: #de595c;
  border-radius: 28px;
`;
export const ButtonBack: React.FC<BorderlessButtonProperties> = styled(
  BorderlessButton,
)`
  align-self: flex-start;
`;
export const IconPower: React.FC = styled(MaterialIcons).attrs({
  name: 'power-settings-new',
  size: 24,
  color: '#fff',
})``;
export const IconEdit: React.FC = styled(MaterialIcons).attrs(props => ({
  name: 'edit',
  size: 24,
  color: props.theme.colors.primary,
}))``;
