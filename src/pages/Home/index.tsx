import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
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
import { addTypers, addUsersLoggeds } from '../../store/modules/socket/actions';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { messages } = useSelector((state: RootState) => state.messages);
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);
  const { typers, usersLoggeds } = useSelector(
    (state: RootState) => state.socket,
  );

  const socket = useMemo(() => {
    return io(env.API_URL, {
      query: { user: user?.user.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('usersLoggeds', (usersLoggedsSocket: string) => {
      dispatch(addUsersLoggeds(JSON.parse(usersLoggedsSocket)));
    });

    socket.on('typing', (typingSocket: string) => {
      dispatch(addTypers(JSON.parse(typingSocket)));
    });

    socket.on('message', (messageSocket: string) => {
      const messageParse = JSON.parse(messageSocket);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      dispatch(
        addMessage({
          ...messageParse,
          readed: false,
          id: messageParse.user,
        }),
      );
    });
  }, [socket, dispatch]);

  const getLastMessage = useCallback(
    attendant => {
      const messagesUser = messages.filter(m => m.id === attendant.id);
      return messagesUser[messagesUser.length - 1];
    },
    [messages],
  );

  const test = useMemo(() => {
    const attendantsTemp = attendants
      .filter(a => !!messages.find(m => m.id === a.id))
      .map(a => ({
        ...a,
        numberMessagesNoRead: messages
          .filter(m => m.id === a.id)
          .filter(m => m.readed === false).length,
      }))
      .sort((a, b) =>
        getLastMessage(a)?.date > getLastMessage(b)?.date ? -1 : 1,
      );

    return attendantsTemp;
  }, [attendants, messages, getLastMessage]);

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);
      return messagesUser;
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
            {test.map(a => (
              <Box
                key={a.id}
                onPress={() => {
                  navigation.navigate('Chat', {
                    user: a,
                    messagesNoRead: getMessagesNoReadedsArray(a),
                    socket,
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
                  {usersLoggeds && usersLoggeds[a.id] && <BoxCircleOnline />}
                </BoxAvatarContainer>
                <BoxTextContainer>
                  <BoxTitle>{a.name}</BoxTitle>
                  {typers && typers[a.id] ? (
                    <TypingDesc>Digitando...</TypingDesc>
                  ) : (
                    <BoxDesc>{getLastMessage(a)?.message}</BoxDesc>
                  )}
                </BoxTextContainer>

                {a.numberMessagesNoRead > 0 && (
                  <BoxCircle>
                    <BoxCircleText>{a.numberMessagesNoRead}</BoxCircleText>
                  </BoxCircle>
                )}
              </Box>
            ))}
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
