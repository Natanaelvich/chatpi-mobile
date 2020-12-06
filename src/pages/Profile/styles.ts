import styled, { css } from 'styled-components/native';
import { ImageProps, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome } from 'expo-vector-icons';

interface AvatarContainerProps {
  loading: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  margin: 24px 0;
`;

export const ContainerModalPreview = styled.View`
  flex: 1;
`;
export const TextPreview = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 24px;
`;
export const ContainerButtonsPreview = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: space-around;
`;
export const ButtonPreview = styled.TouchableWithoutFeedback``;
export const IconAwesome = styled(FontAwesome).attrs(props => ({
  size: props.size,
  name: props.name,
  color: props.theme.colors[props.color],
}))``;

export const AvatarModal: React.FC<ImageProps> = styled.Image`
  flex: 1;
  border-radius: 22px;
`;
export const AvatarContainer = styled(RectButton)<AvatarContainerProps>`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  position: relative;
  margin-top: 64px;
  align-self: center;
  align-items: center;
  justify-content: center;
  ${props =>
    props.loading &&
    css`
      background: ${props.theme.colors.background};
    `}
`;
export const ButtonCamera = styled(RectButton)`
  width: 46px;
  height: 46px;
  border-radius: 25px;
  background: ${props => props.theme.colors.secundary};
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 999;
  align-items: center;
  justify-content: center;
`;
export const IconCamera = styled(FontAwesome).attrs({
  name: 'camera',
  size: 24,
  color: '#fff',
})``;
export const Avatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
