import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as Sentry from '@sentry/react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Keyboard, LayoutAnimation, View } from 'react-native';
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
  IconBrain,
  IconNurse,
} from './styles';
import Typing from '../../components/Typing';
import { addMessage, readMessage } from '../../store/modules/messages/actions';
import env from '../../../env';
import getAvatarUrl from '../../utils/getAvatarUrl';

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const router = useRoute();
  const { goBack, navigate } = useNavigation();
  const { user } = useSelector((state: RootState) => state.user);
  const { messages } = useSelector((state: RootState) => state.messages);
  const { typers, usersLoggeds, socket } = useSelector(
    (state: RootState) => state.socket,
  );

  const [message, setMessage] = useState('');

  const userParam = router.params?.user;

  useEffect(() => {
    messages
      .filter(m => m.id === userParam.id)
      .filter(m => m.readed === false)
      .forEach(m => {
        dispatch(readMessage(m));
      });
  }, [dispatch, messages, userParam]);

  useEffect(() => {
    if (user) {
      Sentry.setUser({ username: user?.user.name, id: user?.user.id });
    }
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [scrollRef]);

  const sendMessage = useCallback(() => {
    if (userParam) {
      const messageJsonString = JSON.stringify({
        user: user?.user.id,
        toUser: userParam.id,
        message,
        readed: false,
        date: new Date(),
        name: user?.user.name,
      });

      if (socket) {
        socket.emit('message', messageJsonString);
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      dispatch(
        addMessage({
          user: user?.user.id,
          toUser: userParam.id,
          message,
          readed: true,
          id: userParam.id,
          date: new Date(),
          name: user?.user.name,
        }),
      );

      setMessage('');
      Keyboard.dismiss();
    }
  }, [message, user, userParam, dispatch, socket]);

  return (
    <Container>
      <Header>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BorderlessButton onPress={goBack}>
            <AntDesign name="left" size={16} color="#fff" />
          </BorderlessButton>
          <RectButton
            onPress={() => {
              navigate('UserDetails', {
                user: userParam,
              });
            }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Avatar
              source={{
                uri:
                  getAvatarUrl(userParam.avatar_url) ||
                  `${env.API_URL}/myAvatars/${userParam.id}`,
              }}
            />
            <ContainerText>
              <Title>{userParam.name}</Title>
              {typers && typers[userParam.id] ? (
                <Status author={false}>Digitando...</Status>
              ) : (
                <Status>
                  {usersLoggeds && usersLoggeds[userParam.id]
                    ? 'Online'
                    : 'Offline'}
                </Status>
              )}
            </ContainerText>
          </RectButton>
        </View>

        {userParam.clerk === 'enf' && <IconNurse />}
        {userParam.clerk === 'psic' && <IconBrain />}
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

          {typers && typers[userParam.id] && <Typing />}
        </Messages>
        <InputMessageCotainer>
          <InputMessage
            multiline
            value={message}
            onChangeText={text => {
              setMessage(text);
              if (socket) {
                socket.emit(
                  'typing',
                  JSON.stringify({
                    user: user?.user.id,
                    typing: true,
                    toUser: userParam?.id,
                  }),
                );
              }
            }}
            onEndEditing={() => {
              if (socket) {
                socket.emit(
                  'typingBlur',
                  JSON.stringify({
                    user: user?.user.id,
                    typing: true,
                    toUser: userParam?.id,
                  }),
                );
              }
            }}
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
