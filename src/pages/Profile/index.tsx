import { useNavigation } from '@react-navigation/native';
import { AntDesign } from 'expo-vector-icons';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import env from '../../../env';
import { RootState } from '../../store/modules/rootReducer';
import { signOutRequest } from '../../store/modules/user/actions';

import {
  Container,
  Avatar,
  ButtonToEditUser,
  ButtonLogout,
  IconPower,
  ButtonsContainer,
  ButtonToEditText,
  IconEdit,
  Desc,
  Title,
  AvatarContainer,
  DescContainer,
  ButtonBack,
} from './styles';

const Profile: React.FC = () => {
  const naviation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Container>
      <ButtonBack onPress={() => naviation.goBack()}>
        <AntDesign name="left" size={26} color="#343152" />
      </ButtonBack>
      <AvatarContainer>
        <Avatar
          source={{
            uri: `${env.API_URL}/myAvatars/${user?.user.id}`,
          }}
        />
      </AvatarContainer>

      <DescContainer>
        <Title>Nome</Title>
        <Desc>{user?.user.name}</Desc>

        <Title>Email</Title>
        <Desc>{user?.user.email}</Desc>
      </DescContainer>

      <ButtonsContainer>
        <ButtonToEditUser>
          <ButtonToEditText>Editar Perfil</ButtonToEditText>
          <IconEdit />
        </ButtonToEditUser>

        <ButtonLogout onPress={() => dispatch(signOutRequest())}>
          <IconPower />
        </ButtonLogout>
      </ButtonsContainer>
    </Container>
  );
};

export default Profile;
