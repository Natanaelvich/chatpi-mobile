import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 64px;
`;

export const Title = styled.Text`
  ${props => props.theme.typograph.textH1Bold}
  color: #f4ede8;
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  ${props => props.theme.typograph.textH2Normal}
  color: #f4ede8;
`;

export const AvatarModal = styled.Image`
  flex: 1;
  border-radius: 22px;
`;
export const AvatarContainer = styled.View`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  position: relative;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
export const IconBack = styled(FontAwesome).attrs({
  name: 'angle-left',
  size: 31,
  color: '#fff',
})``;
export const Avatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
