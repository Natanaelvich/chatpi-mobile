import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import {
  Colors,
  ListItem,
  Text,
  Avatar,
  AvatarHelper,
  Drawer,
  Button,
} from 'react-native-ui-lib';

import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
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
  const theme = useTheme();

  const { messages } = useSelector((state: RootState) => state.messages);

  const { modalDeleteData } = useSelector((state: RootState) => state.utils);
  const { typers, usersLoggeds } = useSelector(
    (state: RootState) => state.socket,
  );

  const { messagesUsers, socket } = useChat();

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
              <ListItem
                key={a.id}
                height={75.8}
                onLongPress={() => {
                  if (!userSelecteds.includes(a.id)) {
                    setUserSelecteds(oldUsersSelecteds => [
                      ...oldUsersSelecteds,
                      a.id,
                    ]);

                    setDeleteModeMessage(true);
                  }
                }}
                // deleteMode={userSelecteds.includes(a.id) && deleteModeMessage}
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
                  });
                }}
              >
                <ListItem.Part left>
                  <Avatar
                    size={54}
                    source={{
                      uri:
                        getAvatarUrl(a.avatar_url) ||
                        `${BASE_URL}/myAvatars/${a.id}`,
                    }}
                    label={a.name}
                    containerStyle={{ marginHorizontal: 18 }}
                    badgeProps={{
                      backgroundColor:
                        usersLoggeds && usersLoggeds[a.id]
                          ? Colors.green30
                          : 'transparent',
                    }}
                  />
                </ListItem.Part>

                <ListItem.Part
                  middle
                  column
                  containerStyle={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: Colors.dark70,
                    paddingRight: 17,
                  }}
                >
                  <ListItem.Part containerStyle={{ marginBottom: 3 }}>
                    <Text
                      style={{ flex: 1 }}
                      text70
                      color={Colors.dark10}
                      numberOfLines={1}
                    >
                      {a.name}
                    </Text>
                    <DateParsed date={a.lastMessage.date} />
                  </ListItem.Part>
                  <ListItem.Part>
                    {typers && typers[a.id] ? (
                      <TypingDesc>Digitando...</TypingDesc>
                    ) : (
                      <Text
                        style={{
                          marginRight: 10,
                          maxWidth: '70%',
                          fontSize: RFValue(12),
                        }}
                        text80
                        color={Colors.dark40}
                        numberOfLines={1}
                      >
                        {a.lastMessage.message}
                      </Text>
                    )}

                    {a.numberMessagesNoRead > 0 && (
                      <Button
                        size="small"
                        backgroundColor={theme.colors.secundary}
                        label={String(a.numberMessagesNoRead)}
                      />
                    )}
                  </ListItem.Part>
                </ListItem.Part>
              </ListItem>
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
