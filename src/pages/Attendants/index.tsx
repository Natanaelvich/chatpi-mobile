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
import env from '../../../env';

const Attendants: React.FC = () => {
  const dispatch = useDispatch();
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  const [usersLoggeds, setUsersLoggeds] = useState([]);

  useEffect(() => {
    dispatch(getAttendants());
  }, [dispatch]);

  const socket = useMemo(() => {
    return io(env.API_URL, {
      query: { user: user?.user.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
  }, [socket]);

  return (
    <Container>
      <Content>
        <ContentTitle>Atendentes</ContentTitle>
        <ContentScroll>
          {attendants
            .filter(a => a.id !== user?.user.id)
            .map(a => (
              <Box
                key={a.id}
                onPress={() => {
                  navigation.navigate('Chat', {
                    user: a,
                  });
                }}
              >
                <BoxAvatar
                  source={{ uri: `${env.API_URL}/myAvatars/${a.id}` }}
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
