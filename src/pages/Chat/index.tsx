import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import * as Sentry from '@sentry/react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Keyboard, LayoutAnimation, View } from 'react-native';
import uuid from 'react-native-uuid';

import { RFValue } from 'react-native-responsive-fontsize';
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
  MessageContainer,
} from './styles';
import Typing from '../../components/Typing';
import { addMessage, readMessage } from '../../store/modules/messages/actions';

import getAvatarUrl from '../../utils/getAvatarUrl';
import { UserContent } from '../../store/modules/auth/reducer';
import { BASE_URL } from '../../config';
import { OfflineQueueActions } from '../../store/modules/messages/offline';
import { useChat } from '../../hooks/modules/ChatContext';
import { UserProps } from '../../store/modules/attendants/reducer';

type ParamList = {
  Chat: {
    user: UserContent;
    userId: string;
  };
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView>();
  const { params } = useRoute<RouteProp<ParamList, 'Chat'>>();

  const { goBack, navigate } = useNavigation();
  const { data: user } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.attendants);
  const { messages } = useSelector((state: RootState) => state.messages);
  const { typers, usersLoggeds } = useSelector(
    (state: RootState) => state.socket,
  );
  const [userChat, setUserChat] = useState<UserProps>();

  const { socket } = useChat();

  const [message, setMessage] = useState('');

  const { user: userParam, userId } = params;

  useEffect(() => {
    if (userId) {
      const userFind = users.find(u => u.id === userId);

      if (userFind) {
        setUserChat(userFind);
      }
    } else {
      setUserChat(userParam);
    }
  }, [userId, userParam, users]);

  useEffect(() => {
    messages
      .filter(m => m.id === userChat?.id)
      .filter(m => m.readed === false)
      .forEach(m => {
        dispatch(readMessage(m));
      });
  }, [dispatch, messages, userChat]);

  useEffect(() => {
    if (user) {
      Sentry.setUser({ username: user?.user.name, id: user?.user.id });
    }
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [scrollRef]);

  const sendMessage = useCallback(() => {
    if (userChat) {
      const idMessage = uuid.v4();

      const messageJsonString = JSON.stringify({
        idMessage,
        user: user?.user?.id,
        toUser: userChat?.id,
        message,
        readed: false,
        date: new Date(),
        name: user?.user?.name,
        url: `https://www.chatpi.com/Chat/${user?.user?.id}`,
        largeIcon:
          user?.user?.avatar_url || `${BASE_URL}/myAvatars/${user?.user?.id}`,
      });

      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      dispatch(
        addMessage({
          idMessage,
          user: user?.user.id,
          toUser: userChat.id,
          message,
          readed: true,
          id: userChat.id,
          date: new Date(),
          name: user?.user.name,
          sended: false,
        }),
      );

      dispatch(OfflineQueueActions.SendMessage(messageJsonString, socket));

      setMessage('');
      Keyboard.dismiss();
    }
  }, [message, user, userChat, dispatch, socket]);

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
                user: userChat,
              });
            }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Avatar
              source={{
                uri:
                  getAvatarUrl(userChat?.avatar_url) ||
                  `${BASE_URL}/myAvatars/${userChat?.id}`,
              }}
            />
            <ContainerText>
              <Title>{userChat?.name}</Title>
              {typers && userChat?.id && typers[userChat.id] ? (
                <Status author={false}>Digitando...</Status>
              ) : (
                <Status author>
                  {usersLoggeds && userChat?.id && usersLoggeds[userChat.id]
                    ? 'Online'
                    : 'Offline'}
                </Status>
              )}
            </ContainerText>
          </RectButton>
        </View>

        {userChat?.clerk === 'enf' && <IconNurse />}
        {userChat?.clerk === 'psic' && <IconBrain />}
      </Header>
      <Content>
        <Messages
          ref={scrollRef as any}
          onContentSizeChange={() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {messages
            .filter(m => m.id === userChat?.id)
            .map((m, index) => (
              <MessageContainer
                key={index}
                author={user?.user.id === m?.user}
                sended={m.sended}
              >
                <Message author={user?.user.id === m?.user} sended={m.sended}>
                  {m.message}
                </Message>
                {user?.user.id === m?.user && !m.sended && (
                  <AntDesign
                    name="clockcircleo"
                    size={RFValue(16)}
                    color="white"
                  />
                )}
              </MessageContainer>
            ))}

          {typers && userChat?.id && typers[userChat.id] && <Typing />}
        </Messages>
        <InputMessageCotainer>
          <InputMessage
            multiline
            autoCorrect={false}
            autoCapitalize="none"
            value={message}
            onChangeText={text => {
              setMessage(text);
              if (socket) {
                socket.emit(
                  'typing',
                  JSON.stringify({
                    user: user?.user.id,
                    typing: true,
                    toUser: userChat?.id,
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
                    toUser: userChat?.id,
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
