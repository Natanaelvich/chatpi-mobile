import { MaterialIcons } from 'expo-vector-icons';
import {
  ImageProps,
  ScrollViewProps,
  TouchableOpacityProps,
} from 'react-native';
import styled from 'styled-components/native';

export const Container: React.FC = styled.View`
  position: relative;
  flex: 1;
  background: ${props => props.theme.colors.primary};
`;
export const Content: React.FC = styled.View`
  flex: 1;
  border-top-right-radius: 44px;
  border-top-left-radius: 44px;
  background: ${props => props.theme.colors.background};
  padding-top: 28px;
`;
export const ContentScroll: React.FC<ScrollViewProps> = styled.ScrollView.attrs(
  {
    keyboardShouldPersistTaps: 'always',
    contentContainerStyle: { paddingHorizontal: 12 },
  } as ScrollViewProps,
)``;
export const ContentTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  margin: 0 0 21px 21px;
`;
export const Box: React.FC<TouchableOpacityProps> = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;
export const BoxAvatar: React.FC<ImageProps> = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
export const BoxTextContainer: React.FC = styled.View`
  margin-left: 16px;
  flex: 1;
`;
export const BoxTitle: React.FC = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;

  color: ${props => props.theme.colors.text};
`;
export const BoxDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #b5b5b5;
`;
export const IconNext = styled(MaterialIcons).attrs(props => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: props.theme.colors.primary,
}))``;
