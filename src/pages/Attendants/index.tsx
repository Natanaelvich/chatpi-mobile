import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  SectionTitle,
  Section,
  IconBrain,
  IconNurse,
} from './styles';
import {
  getAttendants,
  getUsers,
} from '../../store/modules/attendants/actions';
import { RootState } from '../../store/modules/rootReducer';
import env from '../../../env';
import getAvatarUrl from '../../utils/getAvatarUrl';

const Attendants: React.FC = () => {
  const dispatch = useDispatch();
  const { attendants } = useSelector((state: RootState) => state.attendants);
  const { usersLoggeds } = useSelector((state: RootState) => state.socket);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAttendants());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Container>
      <Content>
        <ContentScroll>
          <ContentTitle>Atendentes</ContentTitle>

          <Section>
            <SectionTitle>Enfermeiros(a)</SectionTitle>
            <IconNurse />
          </Section>
          {attendants
            .filter(a => a.clerk === 'enf')
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
                  source={{
                    uri:
                      getAvatarUrl(a.avatar_url) ||
                      `${env.API_URL}/myAvatars/${a.id}`,
                  }}
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
          <Section>
            <SectionTitle>Psicólogos(a)</SectionTitle>
            <IconBrain />
          </Section>
          {attendants
            .filter(a => a.clerk === 'psic')
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
                  source={{
                    uri:
                      getAvatarUrl(a.avatar_url) ||
                      `${env.API_URL}/myAvatars/${a.id}`,
                  }}
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
