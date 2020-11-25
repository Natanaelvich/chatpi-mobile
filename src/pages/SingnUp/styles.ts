import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})`
  background: #312e38;
`;
export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
export const Logo = styled.Image``;
export const Title = styled.Text`
  margin: 64px 0 24px;
  font-size: 24px;
  line-height: 26px;
  color: #f4ede8;
`;
export const ReturnLoginContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-top-width: 1px;
  border-color: #232129;
  background: #312e38;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;
export const ReturnLoginText = styled.Text`
  font-size: 14px;
  line-height: 18px;
  margin-left: 18px;

  color: #fff;
`;
