/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
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
import { getUsers } from '../../store/modules/users/actions';
import { RootState } from '../../store/modules/rootReducer';
import getAvatarUrl from '../../utils/getAvatarUrl';
import { BASE_URL } from '../../config';

const Attendants: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);
  const { usersLoggeds } = useSelector((state: RootState) => state.socket);
  const navigation = useNavigation();

  return (
    <Container>
      <Content>
        <ContentScroll
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                dispatch(getUsers());
              }}
            />
          }
        >
          <ContentTitle>Atendentes</ContentTitle>

          <Section>
            <SectionTitle>Enfermeiros(a)</SectionTitle>
            <IconNurse />
          </Section>
          {users
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
                      `${BASE_URL}/myAvatars/${a.id}`,
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
          {users
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
                      `${BASE_URL}/myAvatars/${a.id}`,
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
