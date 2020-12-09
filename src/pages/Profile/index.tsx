import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from 'expo-vector-icons';
import api from '../../services/api';

import {
  Container,
  Title,
  Avatar,
  AvatarContainer,
  ButtonCamera,
  IconCamera,
  AvatarModal,
  ButtonPreview,
  ContainerButtonsPreview,
  ContainerModalPreview,
  IconAwesome,
  TextPreview,
} from './styles';
import {
  Button,
  ButtonText,
  IconKey,
  IconMail,
  IconUser,
  Input,
  InputContainer,
} from '../SingnUp/styles';
import { RootState } from '../../store/modules/rootReducer';
import getAvatarUrl from '../../utils/getAvatarUrl';
import env from '../../../env';
import ModalComponent from '../../components/Modal';
import { updateAvatar, updateUser } from '../../store/modules/user/actions';
import { ErrorLogin, ErrorLoginText } from '../SingnIn/styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUpdateAvatar, setloadingUpdateAvatar] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [messageErrorUpdate, setMessageErrorUpdate] = useState('');
  const [image, setimage] = useState('');
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalPreviewPhoto, setModalPreviewPhoto] = useState(false);

  useEffect(() => {
    setName(user?.user.name || '');
    setEmail(user?.user.email || '');
  }, [user]);

  async function pickImage(): Promise<void> {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Descule, nós precisamos da sua permisão para continuar!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setimage(result.uri);
      setModalPreviewPhoto(true);
    }
  }

  async function updateAvatarUser(): Promise<void> {
    setModalPreviewPhoto(false);
    try {
      setloadingUpdateAvatar(true);
      const data = new FormData();

      data.append('avatar', {
        name: `image_${user?.user.id}.jpg`,
        type: 'image/jpg',
        uri: image,
      });

      await api.patch('/users/avatar', data);
      dispatch(updateAvatar(image));

      Toast.show({
        text1: 'Perfil atualizado',
        text2: 'Sua foto de perfil foi atualizada 🖼',
        visibilityTime: 2000,
        type: 'success',
      });
    } catch (error) {
      Toast.show({
        text1: 'Ops',
        text2: 'Falha ao atualizar sua foto de perfil 😔',
        visibilityTime: 2000,
        type: 'error',
      });
    } finally {
      setloadingUpdateAvatar(false);
    }
  }

  const handleUpdateProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (
        (password !== '' && oldPassword === '') ||
        (oldPassword !== '' && password === '')
      ) {
        setErrorUpdate(true);
        setMessageErrorUpdate('Verifique a senha atual e a nova senha');
        return;
      }

      const formData = {
        name,
        email,
        ...(oldPassword
          ? {
              oldPassword,
              password,
            }
          : {}),
      };

      const response = await api.put('/profile/update', formData);

      dispatch(updateUser(response.data.user));

      Toast.show({
        text1: 'Perfil atualizado com sucesso!',
        text2: 'As informações do perfil foram atualizadas.',
        visibilityTime: 3000,
        type: 'success',
      });

      setErrorUpdate(false);
      setMessageErrorUpdate('');
    } catch (err) {
      setErrorUpdate(true);
      setMessageErrorUpdate(
        'Falha ao atualizar, verifique os dados e tente novamente',
      );
    } finally {
      setLoading(false);
    }
  }, [name, email, oldPassword, password, dispatch]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Container>
        <AvatarContainer
          loading={loadingUpdateAvatar}
          onPress={() => setModalAvatarVisible(true)}
        >
          {loadingUpdateAvatar ? (
            <ActivityIndicator
              color="#111"
              animating={loadingUpdateAvatar}
              size="large"
            />
          ) : (
            <>
              <Avatar
                source={{
                  uri:
                    getAvatarUrl(user?.user.avatar_url) ||
                    `${env.API_URL}/myAvatars/${user?.user.id}`,
                }}
              />
              <ButtonCamera onPress={pickImage}>
                <IconCamera />
              </ButtonCamera>
            </>
          )}
        </AvatarContainer>

        <View>
          <Title>Atualizar perfil</Title>
        </View>

        {errorUpdate && (
          <ErrorLogin>
            <MaterialIcons name="error" size={32} color="#E04848" />
            <ErrorLoginText>
              {messageErrorUpdate || 'Houve uma falha inesperada'}
            </ErrorLoginText>
          </ErrorLogin>
        )}

        <InputContainer>
          <Input
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />

          <IconUser />
        </InputContainer>
        <InputContainer>
          <Input
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <IconMail />
        </InputContainer>
        <InputContainer>
          <Input
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            placeholder="Senha Atual"
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current?.focus()}
            ref={passwordRef}
          />
          <IconKey />
        </InputContainer>
        <InputContainer>
          <Input
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Nova Senha"
            returnKeyType="send"
            onSubmitEditing={handleUpdateProfile}
            ref={newPasswordRef}
          />
          <IconKey />
        </InputContainer>

        <Button loading={loading} onPress={handleUpdateProfile}>
          <ButtonText>{loading ? 'Atualizar...' : 'Atualizar'}</ButtonText>
        </Button>
      </Container>

      <ModalComponent
        visible={modalAvatarVisible}
        changeSetVisible={setModalAvatarVisible}
      >
        <AvatarModal
          resizeMode="center"
          source={{
            uri:
              getAvatarUrl(user?.user.avatar_url) ||
              `${env.API_URL}/myAvatars/${user?.user.id}`,
          }}
        />
      </ModalComponent>

      {!!image && (
        <ModalComponent
          visible={modalPreviewPhoto}
          changeSetVisible={setModalPreviewPhoto}
        >
          <ContainerModalPreview>
            <AvatarModal resizeMode="center" source={{ uri: image }} />
            <TextPreview>Confirma atualizar sua foto de perfil?</TextPreview>
            <ContainerButtonsPreview>
              <ButtonPreview
                onPress={() => {
                  setModalPreviewPhoto(false);
                  setimage('');
                }}
              >
                <IconAwesome name="times-circle" size={51} color="danger" />
              </ButtonPreview>
              <ButtonPreview onPress={updateAvatarUser}>
                <IconAwesome name="check-circle" size={51} color="success" />
              </ButtonPreview>
            </ContainerButtonsPreview>
          </ContainerModalPreview>
        </ModalComponent>
      )}
    </ScrollView>
  );
};

export default Profile;
