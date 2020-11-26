import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import {
  Container,
  Content,
  ContentTitle,
  Box,
  BoxAvatar,
  BoxDesc,
  BoxTitle,
  BoxTextContainer,
  BoxCircle,
  BoxCircleText,
  TypingDesc,
  BoxAvatarContainer,
  BoxCircleOnline,
} from './styles';
import { RootState } from '../../store/modules/rootReducer';
import { addMessage } from '../../store/modules/messages/actions';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { messages } = useSelector((state: RootState) => state.messages);
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);

  const [usersLoggeds, setUsersLoggeds] = useState([]);
  const [typing, setTyping] = useState({});

  const socket = useMemo(() => {
    // return io('https://192.168.0.108:3335', {
    return io('http://10.0.3.2:3335', {
      // return io('https://api.pi.mundotech.dev', {
      query: { user: user?.user.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('message', messageSocket => {
      const messageParse = JSON.parse(messageSocket);
      dispatch(addMessage({ ...messageParse, readed: false }));
    });
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
    socket.on('typing', typingSocket => {
      setTyping(typingSocket);
    });
  }, [socket, dispatch]);

  const getLastMessage = useCallback(
    attendant => {
      const messagesUser = messages.filter(
        m =>
          (m.user === attendant.id && m.toUser === user?.user.id) ||
          (m.user === user?.user.id && m.toUser === attendant.id),
      );

      return messagesUser[messagesUser.length - 1].message;
    },
    [messages, user],
  );

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages.filter(
        m =>
          (m.user === attendant.id && m.toUser === user?.user.id) ||
          (m.user === user?.user.id &&
            m.toUser === attendant.id &&
            m.readed === false),
      );
      return messagesUser;
    },
    [messages, user],
  );

  const getMessagesNoReadeds = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.user === attendant.id && m.toUser === user?.user.id)
        .filter(m => m.readed === false);

      return messagesUser.length;
    },
    [messages, user],
  );

  return (
    <Container>
      <Content>
        <ContentTitle>Conversas</ContentTitle>
        {attendants.map(
          a =>
            !!messages.find(
              m =>
                (m.user === a.id && m.toUser === user?.user.id) ||
                (m.user === user?.user.id && m.toUser === a.id),
            ) && (
              <Box
                onPress={() => {
                  navigation.navigate('Chat', {
                    user: a,
                    messagesNoRead: getMessagesNoReadedsArray(a),
                  });
                }}
              >
                <BoxAvatarContainer>
                  <BoxAvatar
                    source={{
                      uri: `http://192.168.0.108:3335/myAvatars/${a.id}`,
                    }}
                    resizeMode="cover"
                  />
                  {usersLoggeds && usersLoggeds[a.id] && <BoxCircleOnline />}
                </BoxAvatarContainer>
                <BoxTextContainer>
                  <BoxTitle>{a.name}</BoxTitle>
                  {typing && typing[a.id] ? (
                    <TypingDesc>Digitando...</TypingDesc>
                  ) : (
                    <BoxDesc>{getLastMessage(a)}</BoxDesc>
                  )}
                </BoxTextContainer>

                {getMessagesNoReadeds(a) > 0 && (
                  <BoxCircle>
                    <BoxCircleText>{getMessagesNoReadeds(a)}</BoxCircleText>
                  </BoxCircle>
                )}
              </Box>
            ),
        )}
      </Content>
    </Container>
  );
};

export default Home;
