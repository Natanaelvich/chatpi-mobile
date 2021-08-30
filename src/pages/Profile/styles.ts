import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface AvatarContainerProps {
  loading: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 ${RFValue(30)}px ${RFValue(24)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: #f4ede8;
  margin: ${RFValue(24)}px 0 ${RFValue(12)}px;
`;

export const ContainerModalPreview = styled.View`
  flex: 1;
`;
export const TextPreview = styled.Text`
  align-self: center;
  color: #fff;
  font-size: ${RFValue(16)}px;
  font-style: normal;
  font-weight: bold;
  margin-bottom: ${RFValue(24)}px;
`;
export const ContainerButtonsPreview = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: space-around;
`;
export const ButtonPreview = styled.TouchableWithoutFeedback``;

export const AvatarModal = styled.Image`
  flex: 1;
  border-radius: ${RFValue(22)}px;
`;
export const AvatarContainer = styled.View<AvatarContainerProps>`
  width: ${RFValue(186)}px;
  height: ${RFValue(186)}px;
  border-radius: ${RFValue(98)}px;
  position: relative;
  margin-top: ${RFValue(14)}px;
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
  width: ${RFValue(46)}px;
  height: ${RFValue(46)}px;
  border-radius: ${RFValue(25)}px;
  background: ${props => props.theme.colors.secundary};
  position: absolute;
  bottom: ${RFValue(12)}px;
  right: ${RFValue(12)}px;
  z-index: 999;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: ${RFValue(186)}px;
  height: ${RFValue(186)}px;
  border-radius: ${RFValue(98)}px;
  align-self: center;
`;
