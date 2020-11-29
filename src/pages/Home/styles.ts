import { MaterialIcons } from 'expo-vector-icons';
import { ImageProps, TouchableOpacityProps } from 'react-native';
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container: React.FC = styled.View`
  flex: 1;
  background: #343152;
`;
export const EmptyContainer: React.FC = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const EmptyText: React.FC = styled.Text`
  color: #d4d4d4;
  font-size: 16px;
`;
export const EmptyButton: React.FC = styled.Text`
  background: #d4d4d4;

  padding: 16px;

  align-items: center;

  border-radius: 14px;
`;
export const EmptyIconMessage: React.FC = styled(MaterialIcons).attrs({
  name: 'message',
  size: 24,
  color: '#f5f5f5',
})`
  margin: auto;
`;
export const Content: React.FC = styled.View`
  flex: 1;
  border-top-right-radius: 44px;
  border-top-left-radius: 44px;
  background: #fff;
  padding: 28px;
  position: relative;
`;
export const ContentTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #343152;
  margin-bottom: 21px;
`;
export const Box: React.FC<TouchableOpacityProps> = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;
export const BoxAvatarContainer: React.FC = styled.View`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
export const BoxCircleOnline: React.FC = styled.View`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #0aa508;

  bottom: 5px;
  right: 5px;
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
export const TypingDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #0aa508;
`;
export const BoxCircle: React.FC = styled.View`
  background: #fff;
  margin: 12px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #de595c;

  align-items: center;
  justify-content: center;
`;
export const BoxCircleText: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #fceaeb;
`;
export const ButtonToAttendants: React.FC<BorderlessButtonProperties> = styled(
  BorderlessButton,
)`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 55px;
  height: 55px;

  align-items: center;
  justify-content: center;

  border-radius: 14px;
  background: #de595c;

  z-index: 999;
`;
export const IconMessage: React.FC = styled(MaterialIcons).attrs({
  name: 'message',
  size: 24,
  color: '#fff',
})``;
