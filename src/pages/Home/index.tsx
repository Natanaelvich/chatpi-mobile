import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import {
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
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
  ButtonHeaderDeleteMode,
  IconClose,
  IconDelete,
  HeaderDeleteMode,
} from './styles';
import { RootState } from '../../store/modules/rootReducer';
import {
  addMessage,
  addMessages,
  deleteMessage,
  deleteAllMessage,
} from '../../store/modules/messages/actions';
import env from '../../../env';
import {
  addSocket,
  addTypers,
  addUsersLoggeds,
} from '../../store/modules/socket/actions';
import getAvatarUrl from '../../utils/getAvatarUrl';
import ModalDelete from '../../components/ModalDelete';
import DateParsed from '../../components/DateParsed';
import { modalDeleteDataVisible } from '../../store/modules/utils/actions';

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
  const { users } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);
  const { modalDeleteData } = useSelector((state: RootState) => state.utils);
  const { typers, usersLoggeds } = useSelector(
    (state: RootState) => state.socket,
  );

  const [deleteModeMessage, setDeleteModeMessage] = useState(false);
  const [userSelecteds, setUserSelecteds] = useState<string[]>([]);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const socket = useMemo(() => {
    return io(env.API_URL, {
      query: { user: user?.user.id },
    });
  }, [user]);

  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      const tokenExpo = await Notifications.getExpoPushTokenAsync();
      socket.emit('expoToken', tokenExpo.data);
    } else {
      const tokenExpo = await Notifications.getExpoPushTokenAsync();
      socket.emit('expoToken', tokenExpo.data);
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      Notifications.dismissAllNotificationsAsync();
    }
  }, [socket]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [registerForPushNotificationsAsync]);

  useEffect(() => {
    dispatch(addSocket(socket));
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('usersLoggeds', (usersLoggedsSocket: string) => {
      dispatch(addUsersLoggeds(JSON.parse(usersLoggedsSocket)));
    });

    socket.on('typing', (typingSocket: string) => {
      dispatch(addTypers(JSON.parse(typingSocket)));
    });

    socket.on('messagesCache', (messagesCache: string) => {
      dispatch(addMessages(messagesCache));
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
    userMessage => {
      const messagesUser = messages.filter(m => m.id === userMessage.id);
      return messagesUser[messagesUser.length - 1];
    },
    [messages],
  );

  const messagesUsers = useMemo(() => {
    const usersTemp = users
      .filter(a => !!messages.find(m => m.id === a.id))
      .map(a => ({
        ...a,
        numberMessagesNoRead: messages
          .filter(m => m.id === a.id)
          .filter(m => m.readed === false).length,
        lastMessage: getLastMessage(a),
      }))
      .sort((a, b) =>
        getLastMessage(a)?.date > getLastMessage(b)?.date ? -1 : 1,
      );

    return usersTemp;
  }, [users, messages, getLastMessage]);

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);
      return messagesUser;
    },
    [messages],
  );

  function deleteMessages(): void {
    userSelecteds.forEach(u => {
      dispatch(deleteMessage(u));
    });

    setUserSelecteds([]);
    setDeleteModeMessage(false);
  }

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
            {deleteModeMessage ? (
              <HeaderDeleteMode>
                <ButtonHeaderDeleteMode
                  onPress={() => {
                    setDeleteModeMessage(false);
                    setUserSelecteds([]);
                  }}
                >
                  <IconClose />
                </ButtonHeaderDeleteMode>
                <ButtonHeaderDeleteMode
                  onPress={() => {
                    setModalDeleteVisible(true);
                  }}
                >
                  <IconDelete />
                </ButtonHeaderDeleteMode>
              </HeaderDeleteMode>
            ) : (
              <ContentTitle>Conversas</ContentTitle>
            )}
            {messagesUsers.map(a => (
              <Box
                key={a.id}
                onLongPress={() => {
                  if (!userSelecteds.includes(a.id)) {
                    setUserSelecteds(oldUsersSelecteds => [
                      ...oldUsersSelecteds,
                      a.id,
                    ]);

                    setDeleteModeMessage(true);
                  }
                }}
                deleteMode={userSelecteds.includes(a.id) && deleteModeMessage}
                onPress={() => {
                  if (deleteModeMessage) {
                    if (!userSelecteds.includes(a.id)) {
                      setUserSelecteds(oldUsersSelecteds => [
                        ...oldUsersSelecteds,
                        a.id,
                      ]);

                      return;
                    }
                    setUserSelecteds(oldUsersSelecteds =>
                      oldUsersSelecteds.filter(u => u !== a.id),
                    );

                    return;
                  }
                  navigation.navigate('Chat', {
                    user: a,
                    messagesNoRead: getMessagesNoReadedsArray(a),
                  });
                }}
              >
                <BoxAvatarContainer>
                  <BoxAvatar
                    source={{
                      uri:
                        getAvatarUrl(a.avatar_url) ||
                        `${env.API_URL}/myAvatars/${a.id}`,
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
                    <BoxDesc>{a.lastMessage.message}</BoxDesc>
                  )}
                </BoxTextContainer>
                <View>
                  {a.numberMessagesNoRead > 0 && (
                    <BoxCircle>
                      <BoxCircleText>{a.numberMessagesNoRead}</BoxCircleText>
                    </BoxCircle>
                  )}

                  <DateParsed date={a.lastMessage.date} />
                </View>
              </Box>
            ))}
          </>
        )}
        <ButtonToAttendants onPress={() => navigation.navigate('Atendentes')}>
          <IconMessage />
        </ButtonToAttendants>
      </Content>

      <ModalDelete
        visibleDelete={modalDeleteVisible}
        setVisibleDelete={setModalDeleteVisible}
        title="Deletar mensagens?"
        handleDeleteItem={deleteMessages}
      />

      <ModalDelete
        handleDeleteItem={() => {
          dispatch(deleteAllMessage());
        }}
        setVisibleDelete={(e: boolean) => dispatch(modalDeleteDataVisible(e))}
        title="Deseja deletar tudo?"
        visibleDelete={modalDeleteData}
      />
    </Container>
  );
};

export default Home;
