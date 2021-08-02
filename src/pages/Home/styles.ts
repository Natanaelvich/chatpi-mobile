import { MaterialIcons } from '@expo/vector-icons';
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

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

export const TypingDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;

  color: #0aa508;
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
export const BadgeMessagesLenght = styled.View`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  border-radius: ${RFValue(12)}px;
  background: ${({ theme }) => theme.colors.secundary};
  align-items: center;
  justify-content: center;
`;
export const BadgeMessagesLenghtText = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.background};
`;
