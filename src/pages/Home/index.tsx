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
  ButtonToAttendants,
  IconMessage,
  EmptyButton,
  EmptyContainer,
  EmptyIconMessage,
  EmptyText,
} from './styles';
import { RootState } from '../../store/modules/rootReducer';
import { addMessage } from '../../store/modules/messages/actions';
import env from '../../../env';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { messages } = useSelector((state: RootState) => state.messages);
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);

  const [usersLoggeds, setUsersLoggeds] = useState([]);
  const [typing, setTyping] = useState({});

  const socket = useMemo(() => {
    return io(env.API_URL, {
      query: { user: user?.user.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('message', messageSocket => {
      const messageParse = JSON.parse(messageSocket);
      dispatch(
        addMessage({ ...messageParse, readed: false, id: messageParse.user }),
      );
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
      const messagesUser = messages.filter(m => m.id === attendant.id);

      return messagesUser[messagesUser.length - 1].message;
    },
    [messages],
  );

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);
      return messagesUser;
    },
    [messages],
  );

  const getMessagesNoReadeds = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);

      return messagesUser.length;
    },
    [messages],
  );

  return (
    <Container>
      <Content>
        {messages.length === 0 ? (
          <EmptyContainer>
            <EmptyText>Você não possui mensagens</EmptyText>
            <EmptyText>Para iniciar uma nova toque em</EmptyText>

            <EmptyButton>
              <EmptyIconMessage />
            </EmptyButton>
          </EmptyContainer>
        ) : (
          <>
            <ContentTitle>Conversas</ContentTitle>
            {attendants.map(
              a =>
                !!messages.find(m => m.id === a.id) && (
                  <Box
                    key={a.id}
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
                          uri: `${env.API_URL}/myAvatars/${a.id}`,
                        }}
                        resizeMode="cover"
                      />
                      {usersLoggeds && usersLoggeds[a.id] && (
                        <BoxCircleOnline />
                      )}
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
          </>
        )}
        <ButtonToAttendants onPress={() => navigation.navigate('Atendentes')}>
          <IconMessage />
        </ButtonToAttendants>
      </Content>
    </Container>
  );
};

export default Home;
