import styled, { css } from 'styled-components/native';

type Button = {
  secundary?: boolean;
};

export const ModalContentDelete = styled.View`
  background: ${props => props.theme.colors.background};
  padding: 18px;
  border-radius: 6px;
`;
export const ButtonContainerDelete = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonModal = styled.TouchableOpacity<Button>`
  ${props =>
    !props.secundary &&
    css`
      background: #de595c;
    `}
  border-radius: 10px;
  height: 50px;

  align-items: center;
  justify-content: center;
  width: 45%;
`;
export const ButtonText = styled.Text<Button>`
  ${props => props.theme.typograph.textH1Bold}
  color:${props => props.theme.colors.textButton};
  ${props =>
    props.secundary &&
    css`
      color: ${props.theme.colors.secundary};
    `}
`;
export const ModalTitleDelete = styled.Text`
  ${props => props.theme.typograph.textH1Bold}
  color: ${props => props.theme.colors.text};
  align-self: center;
  margin-bottom: 12px;
`;
