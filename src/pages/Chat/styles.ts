import { MaterialIcons } from 'expo-vector-icons';
import { ImageProps, ScrollViewProps, TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface MessageProps {
  author: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.primary};
`;
export const Header: React.FC = styled.View`
  flex-direction: row;
  padding: 28px 12px;
  align-items: center;
`;
export const Avatar: React.FC<ImageProps> = styled.Image`
  width: 53px;
  height: 53px;
  border-radius: 26px;
  margin: 0 12px 0 21px;
`;
export const ContainerText: React.FC = styled.View``;
export const Title = styled.Text`
  font-size: 16px;
  color: #fff;
  font-style: normal;
  font-weight: bold;
`;
export const Status = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  color: #b5b5b5;
`;
export const Content: React.FC = styled.View`
  flex: 1;
  border-top-right-radius: 44px;
  border-top-left-radius: 44px;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
`;
export const Messages: React.FC<ScrollViewProps> = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'flex-end',
    padding: 20,
    overflow: 'hidden',
    flexGrow: 1,
  },
} as ScrollViewProps)``;
export const Message = styled.Text<MessageProps>`
  background: ${props => (props.author ? '#DE595C' : '#EEEDF0')};
  padding: 16px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 12px;
  max-width: 80%;
  align-self: ${props => (props.author ? 'flex-end' : 'flex-start')};
  border-radius: 12px;

  ${props =>
    props.author
      ? css`
          border-bottom-right-radius: 0;
        `
      : css`
          border-bottom-left-radius: 0;
        `}

  color: ${props => (props.author ? '#FCEAEB' : props.theme.colors.primary)};
`;
export const InputMessageCotainer = styled.View`
  flex-direction: row;
  padding: 0 12px 12px;
  align-items: center;
`;
export const InputMessage: React.FC<TextInputProps> = styled.TextInput.attrs({
  placeholderTextColor: '#B5B5B5',
  placeholder: 'Digite sua mensagem...',
  returnKeyType: 'send',
  underlineColorAndroid: 'transparent',
} as TextInputProps)`
  flex: 1;
  border-radius: 12px;
  padding: 12px;
  color: ${props => props.theme.colors.textInput};
  background: ${props => props.theme.colors.input};
`;
export const ButtonSendMessage = styled(BorderlessButton)`
  padding-left: 6px;
`;
export const IconSendMessage = styled(MaterialIcons).attrs({
  name: 'send',
  size: 26,
  color: '#8FA7B3',
})``;
