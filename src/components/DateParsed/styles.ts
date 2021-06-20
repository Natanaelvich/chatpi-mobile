import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  max-width: 95%;
`;
export const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;

  color: #b5b5b5;
  align-self: flex-end;
`;
