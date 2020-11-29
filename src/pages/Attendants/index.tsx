import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import { LayoutAnimation } from 'react-native';
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
import { addMessage } from '../../store/modules/messages/actions';

const Attendants: React.FC = () => {
  const dispatch = useDispatch();
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { user } = useSelector((state: RootState) => state.user);
  const { usersLoggeds } = useSelector((state: RootState) => state.socket);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAttendants());
  }, [dispatch]);

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
