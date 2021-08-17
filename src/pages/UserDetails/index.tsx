import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
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
import { UserProps } from '../../store/modules/auth/reducer';
import assets from '../../assets';

type ParamList = {
  UserDetails: UserProps;
};

const UserDetails: React.FC = () => {
  const router = useRoute<RouteProp<ParamList, 'UserDetails'>>();
  const { goBack } = useNavigation();
  const theme = useTheme();

  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);

  const { user } = router.params;
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
        <AvatarContainer>
          <Lightbox underlayColor={theme.colors.primary}>
            <Avatar
              source={
                assets.avatarProfile || {
                  uri: getAvatarUrl(user?.avatar_url),
                }
              }
            />
          </Lightbox>
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
          source={
            assets.avatarProfile || {
              uri: getAvatarUrl(user?.avatar_url),
            }
          }
        />
      </ModalComponent>
    </ScrollView>
  );
};

export default UserDetails;
