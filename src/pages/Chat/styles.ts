import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface MessageProps {
  author: boolean;
}
interface StatusProps {
  author: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.primary};
`;
export const Header = styled.View`
  flex-direction: row;
  padding: ${RFValue(28)}px ${RFValue(12)}px;
  align-items: center;
  justify-content: space-between;
`;
export const Avatar = styled.Image`
  width: ${RFValue(53)}px;
  height: ${RFValue(53)}px;
  border-radius: ${RFValue(26)}px;
  margin: 0 ${RFValue(12)}px 0 ${RFValue(21)}px;
`;
export const ContainerText = styled.View``;
export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #fff;
  font-style: normal;
  font-weight: bold;
`;
export const Status = styled.Text<StatusProps>`
  font-size: ${RFValue(12)}px;
  font-style: normal;
  font-weight: bold;
  color: #b5b5b5;
`;
export const Content = styled.View`
  flex: 1;
  border-top-right-radius: ${RFValue(44)}px;
  border-top-left-radius: ${RFValue(44)}px;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
`;
export const Messages = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'flex-end',
    padding: 20,
    overflow: 'hidden',
    flexGrow: 1,
  },
})``;
export const Message = styled.Text<MessageProps>`
  background: ${props =>
    props.author ? '#DE595C' : props.theme.colors.boxMessage};
  padding: ${RFValue(16)}px;
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  margin-bottom: ${RFValue(12)}px;
  max-width: 80%;
  align-self: ${props => (props.author ? 'flex-end' : 'flex-start')};
  border-radius: ${RFValue(12)}px;

  ${props =>
    props.author
      ? css`
          border-bottom-right-radius: 0;
        `
      : css`
          border-bottom-left-radius: 0;
        `}

  color: ${props => (props.author ? '#FCEAEB' : props.theme.colors.text)};
`;
export const InputMessageCotainer = styled.View`
  flex-direction: row;
  padding: 0 ${RFValue(12)}px ${RFValue(12)}px;
  align-items: center;
`;
export const InputMessage = styled.TextInput.attrs({
  placeholderTextColor: '#B5B5B5',
  placeholder: 'Digite sua mensagem...',
  returnKeyType: 'send',
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  border-radius: ${RFValue(12)}px;
  padding: ${RFValue(12)}px;
  color: ${props => props.theme.colors.textInput};
  background: ${props => props.theme.colors.input};
`;
export const ButtonSendMessage = styled(BorderlessButton)`
  padding-left: ${RFValue(6)}px;
`;
export const IconSendMessage = styled(MaterialIcons).attrs({
  name: 'send',
  size: RFValue(26),
  color: '#8FA7B3',
})``;
export const IconNurse = styled(FontAwesome5).attrs({
  name: 'user-nurse',
  size: RFValue(24),
  color: '#fff',
})`
  margin-right: ${RFValue(12)}px;
`;
export const IconBrain = styled(MaterialCommunityIcons).attrs({
  name: 'brain',
  size: RFValue(24),
  color: '#fff',
})`
  margin-right: ${RFValue(12)}px;
`;
