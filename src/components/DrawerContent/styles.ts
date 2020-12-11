import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Avatar: React.FC<ImageProps> = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 28px;

  border-width: 3px;
  border-color: ${props => props.theme.colors.primary};
`;

export const DrawerContent: React.FC = styled.View`
  flex: 1;
`;

export const UserInfoSection: React.FC = styled.View`
  padding-left: 20px;
  width: 100%;
`;

export const Title: React.FC = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 16px;
  margin-top: 3px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  max-width: 95%;
`;

export const Caption: React.FC = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 14px;
  color: #b5b5b5;
`;
export const Row: React.FC = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;
export const Section: React.FC = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
`;
export const Paragraph: React.FC = styled.Text`
  font-weight: bold;
  margin-right: 3px;
`;
export const IconMoob: React.FC = styled(Feather).attrs(props => ({
  name: 'moon',
  size: 24,
  color: props.theme.colors.text,
}))``;

export const IconDelete: React.FC = styled(MaterialCommunityIcons).attrs(
  props => ({
    name: 'delete-outline',
    size: 24,
    color: props.theme.colors.text,
  }),
)``;
export const IconUser: React.FC = styled(Feather).attrs(props => ({
  name: 'user',
  size: 24,
  color: props.theme.colors.text,
}))``;
export const DrawerSection: React.FC = styled.View`
  border-top-color: #f4f4f4;
  border-top-width: 1px;
  margin-top: 15px;
`;
export const BottomDrawerSection: React.FC = styled.View`
  margin-bottom: 15px;
  border-top-color: #f4f4f4;
  border-top-width: 1px;
`;
export const Preference: React.FC = styled(RectButton)`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
`;
export const PreferenceText: React.FC = styled.Text`
  font-size: 16px;
  margin-top: 3px;
  margin-left: 12px;
  font-weight: normal;
  color: ${props => props.theme.colors.text};
  max-width: 85%;
  flex: 1;
`;
