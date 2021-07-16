import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import Toast from 'react-native-toast-message';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import crashlytics from '@react-native-firebase/crashlytics';
import Upload from 'react-native-background-upload';

import api from '../../services/api';

import {
  Container,
  Title,
  Avatar,
  AvatarContainer,
  ButtonCamera,
  AvatarModal,
  ButtonPreview,
  ContainerButtonsPreview,
  ContainerModalPreview,
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

import ModalComponent from '../../components/Modal';
import { updateAvatar, updateUser } from '../../store/modules/auth/actions';
import { ErrorLogin, ErrorLoginText } from '../SingnIn/styles';
import { BASE_URL } from '../../config';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: user } = useSelector((state: RootState) => state.auth);

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
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Descule, nós precisamos da sua permisão para continuar!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      try {
        setloadingUpdateAvatar(true);
        const data = new FormData();

        data.append('avatar', {
          name: `image_${user?.user.id}.jpg`,
          type: 'image/jpg',
          uri: result.uri,
        });

        // UPLOAD BACKGROUND
        const options = {
          url: 'https://api.pi.mundotech.dev/users/avatar',
          path: result.uri.replace('file://', ''), // on ios remove replace
          method: 'PATCH',
          maxRetries: 2, // set retry count (Android only). Default 2
          headers: {
            'content-type': 'multipart/form-data',
            authorization: `Bearer ${user?.token}`,
          },
          // Below are options only supported on Android
          notification: {
            enabled: true,
          },
          field: 'uploaded_media',
          type: 'multipart',
        };

        Upload.startUpload(options)
          .then(uploadId => {
            console.log('Upload started');
            Upload.addListener('progress', uploadId, data => {
              console.log(`Progress: ${data.progress}%`);
            });
            Upload.addListener('error', uploadId, dataError => {
              console.log(`Error: ${dataError.error}%`);
            });
            Upload.addListener('cancelled', uploadId, data => {
              console.log(`Cancelled!`);
            });
            Upload.addListener('completed', uploadId, data => {
              // data includes responseCode: number and responseBody: Object
              console.log('Completed!');
            });
          })
          .catch(err => {
            console.log('Upload error!', err);
          });
        //

        // await api.patch('/users/avatar', data);
        dispatch(updateAvatar(result.uri));

        Toast.show({
          text1: 'Perfil atualizado',
          text2: 'Sua foto de perfil foi atualizada 🖼',
          visibilityTime: 2000,
          type: 'success',
        });
      } catch (error) {
        crashlytics().recordError(error);

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
  }

  async function updateAvatarUser(): Promise<void> {
    setModalPreviewPhoto(false);
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
      crashlytics().recordError(err);
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
                    `${BASE_URL}/myAvatars/${user?.user.id}`,
                }}
              />
              <ButtonCamera onPress={pickImage}>
                <FontAwesome
                  name="camera"
                  size={RFValue(24)}
                  color={theme.colors.textButton}
                />
              </ButtonCamera>
            </>
          )}
        </AvatarContainer>

        <View>
          <Title>Atualizar perfil</Title>
        </View>

        {errorUpdate && (
          <ErrorLogin>
            <MaterialIcons name="error" size={RFValue(32)} color="#E04848" />
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
              `${BASE_URL}/myAvatars/${user?.user.id}`,
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
                <FontAwesome
                  name="times-circle"
                  size={RFValue(51)}
                  color={theme.colors.danger}
                />
              </ButtonPreview>
              <ButtonPreview onPress={updateAvatarUser}>
                <FontAwesome
                  name="check-circle"
                  size={RFValue(51)}
                  color={theme.colors.success}
                />
              </ButtonPreview>
            </ContainerButtonsPreview>
          </ContainerModalPreview>
        </ModalComponent>
      )}
    </ScrollView>
  );
};

export default Profile;
