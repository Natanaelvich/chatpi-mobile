import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  padding: 0 ${RFValue(18)}px;
`;
export const ModalContent = styled.View`
  background: rgba(63, 58, 121, 0.81);
  padding: ${RFValue(23)}px ${RFValue(11)}px ${RFValue(8)}px;
  border-radius: ${RFValue(6)}px;
  width: ${RFValue(263)}px;
  height: ${RFValue(254)}px;
  align-self: center;
  position: relative;
`;
export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(6)}px;
  top: ${RFValue(6)}px;
`;
export const Desc = styled.Text`
  margin-bottom: ${RFValue(12)}px;
  font-style: normal;
  font-weight: normal;
  font-size: ${RFValue(11)}px;
  line-height: ${RFValue(13)}px;

  color: #ffffff;
`;
export const TextArea = styled.TextInput.attrs({})`
  height: ${RFValue(42)}px;
  background: rgba(31, 29, 60, 1);
  border-radius: ${RFValue(6)}px;
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(6)}px;
  margin-top: ${RFValue(30)}px;
  font-size: ${RFValue(14)}px;
  color: #ffffff;
`;
export const Button = styled.TouchableOpacity`
  width: ${RFValue(226)}px;
  height: ${RFValue(36)}px;

  background: #c85d67;
  border-radius: ${RFValue(9)}px;
  align-self: center;

  align-items: center;
  justify-content: center;
  margin-top: auto;
`;
export const ButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: #ffffff;
`;
export const ModalTitle = styled.Text`
  align-self: center;
  margin-bottom: ${RFValue(12)}px;
  font-style: normal;
  font-weight: normal;
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(21)}px;
  color: #fff;
`;
