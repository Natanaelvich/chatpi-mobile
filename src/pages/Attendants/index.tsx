import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Content,
  ContentTitle,
  Box,
  BoxAvatar,
  BoxDesc,
  BoxTitle,
  BoxTextContainer,
  IconNext,
  ContentScroll,
} from './styles';
import { getAttendants } from '../../store/modules/attendants/actions';
import { RootState } from '../../store/modules/rootReducer';

const Attendants: React.FC = () => {
  const dispatch = useDispatch();
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [usersLoggeds, setUsersLoggeds] = useState([]);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    dispatch(getAttendants());
  }, [dispatch]);

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
      setMessages(oldMessages => [...oldMessages, messageParse]);
    });
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
    socket.on('typing', typingSocket => {
      setTyping(typingSocket);
    });
  }, [socket]);

  return (
    <Container>
      <Content>
        <ContentTitle>Atendentes</ContentTitle>
        <ContentScroll>
          {attendants.map(a => (
            <Box
              key={a.id}
              onPress={() =>
                navigation.navigate('Chat', {
                  user: a,
                })
              }
            >
              <BoxAvatar
                source={{ uri: `http://192.168.0.108:3335/myAvatars/${a.id}` }}
                resizeMode="cover"
              />
              <BoxTextContainer>
                <BoxTitle>{a.name}</BoxTitle>
                <BoxDesc>
                  {usersLoggeds && usersLoggeds[a.id] ? 'Online' : 'Offline'}
                </BoxDesc>
              </BoxTextContainer>

              <IconNext />
            </Box>
          ))}
        </ContentScroll>
      </Content>
    </Container>
  );
};

export default Attendants;
