import styled, { css } from 'styled-components/native';
import { ImageProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome } from 'expo-vector-icons';

interface AvatarContainerProps {
  loading: boolean;
}

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

export const AvatarModal: React.FC<ImageProps> = styled.Image`
  flex: 1;
  border-radius: 22px;
`;
export const AvatarContainer = styled(RectButton)<AvatarContainerProps>`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  position: relative;
  align-self: center;
  align-items: center;
  justify-content: center;
  ${props =>
    props.loading &&
    css`
      background: ${props.theme.colors.background};
    `}
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
