import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  padding: 0 18px;
`;
export const ModalContent = styled.View`
  background: rgba(63, 58, 121, 0.81);
  padding: 23px 11px 8px;
  border-radius: 6px;
  width: 263px;
  height: 254px;
  align-self: center;
  position: relative;
`;
export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  right: 6px;
  top: 6px;
`;
export const Desc = styled.Text`
  margin-bottom: 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;

  color: #ffffff;
`;
export const TextArea = styled.TextInput.attrs({})`
  height: 42px;
  background: rgba(31, 29, 60, 1);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 6px;
  margin-top: 30px;
  font-size: 14px;
  color: #ffffff;
`;
export const Button = styled.TouchableOpacity`
  width: 226px;
  height: 36px;

  background: #c85d67;
  border-radius: 9px;
  align-self: center;

  align-items: center;
  justify-content: center;
  margin-top: auto;
`;
export const ButtonText = styled.Text`
  font-size: 15px;
  color: #ffffff;
`;
export const ModalTitle = styled.Text`
  align-self: center;
  margin-bottom: 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
`;
