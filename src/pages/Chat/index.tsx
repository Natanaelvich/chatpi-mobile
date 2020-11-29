import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from 'expo-vector-icons';
import * as Sentry from 'sentry-expo';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { RootState } from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Header,
  Avatar,
  Title,
  Status,
  ContainerText,
  Messages,
  Message,
  InputMessage,
  ButtonSendMessage,
  IconSendMessage,
  InputMessageCotainer,
} from './styles';
import Typing from '../../components/Typing';
import { addMessage, readMessage } from '../../store/modules/messages/actions';
import env from '../../../env';

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const router = useRoute();
  const { goBack } = useNavigation();
  const { user } = useSelector((state: RootState) => state.user);
  const { messages } = useSelector((state: RootState) => state.messages);

  const [usersLoggeds, setUsersLoggeds] = useState([]);
  const [typing, setTyping] = useState({});
  const [message, setMessage] = useState('');

  const userParam = router.params?.user;
  const messagesNoRead = router.params?.messagesNoRead;

  useEffect(() => {
    if (user) {
      Sentry.Native.setUser({ username: user?.user.name, id: user?.user.id });
    }
  }, [user]);

  useEffect(() => {
    if (messagesNoRead) {
      messagesNoRead.forEach(m => {
        dispatch(readMessage(m));
      });
    }
  }, [messagesNoRead, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [scrollRef]);

  const socket = useMemo(() => {
    return io(env.API_URL, {
      query: { user: user?.user.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('message', messageSocket => {
      const messageParse = JSON.parse(messageSocket);
      dispatch(
        addMessage({ ...messageParse, readed: true, id: messageParse.user }),
      );
    });
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
    socket.on('typing', typingSocket => {
      setTyping(typingSocket);
    });
  }, [socket, dispatch]);

  const sendMessage = useCallback(() => {
    if (userParam) {
      const messageJsonString = JSON.stringify({
        user: user?.user.id,
        toUser: userParam.id,
        message,
        readed: false,
      });
      socket.emit('message', messageJsonString);
      dispatch(
        addMessage({
          user: user?.user.id,
          toUser: userParam.id,
          message,
          readed: true,
          id: userParam.id,
        }),
      );

      setMessage('');
      Keyboard.dismiss();
    }
  }, [socket, message, user, userParam, dispatch]);

  return (
    <Container>
      <Header>
        <BorderlessButton onPress={goBack}>
          <AntDesign name="left" size={16} color="#fff" />
        </BorderlessButton>
        <Avatar
          source={{
            uri: `${env.API_URL}/myAvatars/${userParam.id}`,
          }}
        />
        <ContainerText>
          <Title>{userParam.name}</Title>
          {typing && typing[userParam.id] ? (
            <Status author={false}>Digitando...</Status>
          ) : (
            <Status>
              {usersLoggeds && usersLoggeds[userParam.id]
                ? 'Online'
                : 'Offline'}
            </Status>
          )}
        </ContainerText>
      </Header>
      <Content>
        <Messages
          ref={scrollRef}
          onContentSizeChange={() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {messages
            .filter(m => m.id === userParam.id)
            .map((m, index) => (
              <Message key={index} author={user?.user.id === m?.user}>
                {m.message}
              </Message>
            ))}

          {typing && typing[userParam.id] && <Typing />}
        </Messages>
        <InputMessageCotainer>
          <InputMessage
            multiline
            value={message}
            onChangeText={text => {
              setMessage(text);
              socket.emit('typing', {
                user: user?.user.id,
                typing: true,
                toUser: userParam?.id,
              });
            }}
            onEndEditing={() => {
              socket.emit('typingBlur', {
                user: user?.user.id,
                typing: true,
                toUser: userParam?.id,
              });
            }}
            onSubmitEditing={sendMessage}
          />
          <ButtonSendMessage onPress={sendMessage}>
            <IconSendMessage />
          </ButtonSendMessage>
        </InputMessageCotainer>
      </Content>
    </Container>
  );
};

export default Chat;
