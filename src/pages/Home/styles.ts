import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

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
  font-size: ${RFValue(16)}px;
`;
export const EmptyButton: React.FC = styled.Text`
  background: #d4d4d4;
  padding: ${RFValue(16)}px;
  align-items: center;
  border-radius: ${RFValue(14)}px;
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
  border-top-right-radius: ${RFValue(44)}px;
  border-top-left-radius: ${RFValue(44)}px;
  background: ${props => props.theme.colors.background};
  background: ${props => props.theme.colors.background};
  position: relative;
`;
export const ContentTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.text};
  padding: ${RFValue(28)}px;
`;

export const Box: React.FC<BoxProps> = styled.TouchableOpacity<BoxProps>`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(16)}px ${RFValue(28)}px;
  ${props =>
    props.deleteMode &&
    css`
      background: rgba(222, 89, 92, 0.39);
    `}
`;
export const BoxAvatarContainer: React.FC = styled.View`
  position: relative;
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
`;
export const BoxCircleOnline: React.FC = styled.View`
  position: absolute;
  width: ${RFValue(10)}px;
  height: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
  background: #0aa508;

  bottom: ${RFValue(5)}px;
  right: ${RFValue(5)}px;
`;
export const ContentBoxText = styled.View`
  flex: 1;
`;
export const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-left: ${RFValue(12)}px;
`;
export const BoxAvatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
`;
export const BoxTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(6)}px;

  color: ${props => props.theme.colors.text};
`;
export const BoxDesc: React.FC = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  max-width: ${RFValue(100)}px;

  color: #b5b5b5;
`;
export const TypingDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;

  color: #0aa508;
`;
export const BoxCircle: React.FC = styled.View`
  margin: ${RFValue(12)}px;
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: ${RFValue(10)}px;
  background: #de595c;

  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;
export const BoxCircleText: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  color: #fceaeb;
`;
export const ButtonToAttendants = styled(BorderlessButton)`
  position: absolute;
  bottom: ${RFValue(24)}px;
  right: ${RFValue(24)}px;
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;

  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(14)}px;
  background: #de595c;

  z-index: 999;
`;
export const IconMessage: React.FC = styled(MaterialIcons).attrs({
  name: 'message',
  size: RFValue(24),
  color: '#fff',
})``;
export const HeaderDeleteMode: React.FC = styled.View`
  padding: ${RFValue(28)}px;
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
