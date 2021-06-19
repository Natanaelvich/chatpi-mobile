import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface BoxProps extends TouchableOpacityProps {
  deleteMode: boolean;
}

export const Container: React.FC = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.primary};
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
  background: ${props => props.theme.colors.background};
  background: ${props => props.theme.colors.background};
  position: relative;
`;
export const ContentTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  padding: 28px;
`;

export const Box: React.FC<BoxProps> = styled.TouchableOpacity<BoxProps>`
  flex-direction: row;
  align-items: center;
  padding: 16px 28px;
  ${props =>
    props.deleteMode &&
    css`
      background: rgba(222, 89, 92, 0.39);
    `}
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
export const ContentBoxText = styled.View`
  flex: 1;
`;
export const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-left: 12px;
`;
export const BoxAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
export const BoxTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;

  color: ${props => props.theme.colors.text};
`;
export const BoxDesc: React.FC = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  max-width: 80%;

  color: #b5b5b5;
`;
export const TypingDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #0aa508;
`;
export const BoxCircle: React.FC = styled.View`
  margin: 12px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #de595c;

  align-items: center;
  justify-content: center;
  align-self: flex-end;
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
export const HeaderDeleteMode: React.FC = styled.View`
  padding: 28px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ButtonHeaderDeleteMode: React.FC<BorderlessButtonProperties> = styled(
  BorderlessButton,
)``;
export const IconDelete: React.FC = styled(MaterialIcons).attrs(props => ({
  name: 'delete',
  size: 24,
  color: props.theme.colors.danger,
}))``;
export const IconClose: React.FC = styled(MaterialIcons).attrs(props => ({
  name: 'close',
  size: 24,
  color: props.theme.colors.danger,
}))``;
