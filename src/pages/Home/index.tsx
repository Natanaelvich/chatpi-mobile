import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import OneSignal from 'react-native-onesignal';
import {
  Container,
  Content,
  ContentTitle,
  Box,
  BoxAvatar,
  BoxDesc,
  BoxTitle,
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
  ViewRow,
  ContentBoxText,
} from './styles';
import { RootState } from '../../store/modules/rootReducer';
import {
  deleteMessage,
  deleteAllMessage,
} from '../../store/modules/messages/actions';

import getAvatarUrl from '../../utils/getAvatarUrl';
import ModalDelete from '../../components/ModalDelete';
import DateParsed from '../../components/DateParsed';
import { modalDeleteDataVisible } from '../../store/modules/utils/actions';
import { BASE_URL } from '../../config';
import { useChat } from '../../hooks/modules/ChatContext';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { messages } = useSelector((state: RootState) => state.messages);

  const { modalDeleteData } = useSelector((state: RootState) => state.utils);
  const { typers, usersLoggeds } = useSelector(
    (state: RootState) => state.socket,
  );

  const { messagesUsers, getMessagesNoReadedsArray, socket } = useChat();

  const [deleteModeMessage, setDeleteModeMessage] = useState(false);
  const [userSelecteds, setUserSelecteds] = useState<string[]>([]);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  useEffect(() => {
    async function getOneSignalSubscribeData(): Promise<void> {
      OneSignal.addSubscriptionObserver(event => {
        socket.emit('player_id_onesignal', event?.from.userId);
      });

      const state = await OneSignal.getDeviceState();
      if (state?.userId) {
        socket.emit('player_id_onesignal', state?.userId);
      }
    }

    getOneSignalSubscribeData();
  }, [socket]);

  useEffect(() => {
    OneSignal.setNotificationOpenedHandler(openedEvent => {
      const { notification } = openedEvent;
      const { user: userNotification } = notification?.additionalData as any;
      navigation.navigate('Chat', {
        user: userNotification,
      });
    });
  }, [navigation]);

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
                        `${BASE_URL}/myAvatars/${a.id}`,
                    }}
                    resizeMode="cover"
                  />
                  {usersLoggeds && usersLoggeds[a.id] && <BoxCircleOnline />}
                </BoxAvatarContainer>
                <ContentBoxText>
                  <ViewRow>
                    <BoxTitle>{a.name}</BoxTitle>
                    {a.numberMessagesNoRead > 0 && (
                      <BoxCircle>
                        <BoxCircleText>{a.numberMessagesNoRead}</BoxCircleText>
                      </BoxCircle>
                    )}
                  </ViewRow>
                  <ViewRow>
                    {typers && typers[a.id] ? (
                      <TypingDesc>Digitando...</TypingDesc>
                    ) : (
                      <BoxDesc>{a.lastMessage.message}</BoxDesc>
                    )}
                    <DateParsed date={a.lastMessage.date} />
                  </ViewRow>
                </ContentBoxText>
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
