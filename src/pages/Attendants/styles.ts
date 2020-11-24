import { MaterialIcons } from 'expo-vector-icons';
import { ImageProps } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container: React.FC = styled.View`
  position: relative;
  flex: 1;
  background: #343152;
`;
export const Content: React.FC = styled.View`
  flex: 1;
  border-top-right-radius: 44px;
  border-top-left-radius: 44px;
  background: #fff;
  padding: 28px;
`;
export const ContentTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #343152;
  margin-bottom: 21px;
`;
export const Box: React.FC = styled.TouchableOpacity`
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
export const BoxTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;

  color: #343152;
`;
export const BoxDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #b5b5b5;
`;
export const IconNext = styled(MaterialIcons).attrs({
  name: 'keyboard-arrow-right',
  size: 24,
  color: '#343152',
})``;
