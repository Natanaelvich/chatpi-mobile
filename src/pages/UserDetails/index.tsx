import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { BorderlessButton } from 'react-native-gesture-handler';
import {
  Container,
  Title,
  SubTitle,
  Avatar,
  AvatarContainer,
  AvatarModal,
  IconBack,
} from './styles';
import getAvatarUrl from '../../utils/getAvatarUrl';
import ModalComponent from '../../components/Modal';
import { BASE_URL } from '../../components/config';

const UserDetails: React.FC = () => {
  const router = useRoute();
  const { goBack } = useNavigation();

  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);

  const user = router.params?.user;
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <BorderlessButton
        onPress={goBack}
        style={{
          padding: 24,
        }}
      >
        <IconBack />
      </BorderlessButton>
      <Container>
        <AvatarContainer onPress={() => setModalAvatarVisible(true)}>
          <Avatar
            source={{
              uri:
                getAvatarUrl(user?.avatar_url) ||
                `${BASE_URL}/myAvatars/${user?.id}`,
            }}
          />
        </AvatarContainer>

        <Title>Nome</Title>
        <SubTitle>{user.name}</SubTitle>
        <Title>Email</Title>
        <SubTitle>{user.email}</SubTitle>
        <Title>Atendente</Title>
        <SubTitle>
          {user.clerk === 'enf' ? 'Enfermeiro(a)' : 'Psicólogo(a)'}
        </SubTitle>
      </Container>

      <ModalComponent
        visible={modalAvatarVisible}
        changeSetVisible={setModalAvatarVisible}
      >
        <AvatarModal
          resizeMode="center"
          source={{
            uri:
              getAvatarUrl(user?.avatar_url) ||
              `${BASE_URL}/myAvatars/${user?.id}`,
          }}
        />
      </ModalComponent>
    </ScrollView>
  );
};

export default UserDetails;
