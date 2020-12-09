import React, { useRef, useCallback, useState } from 'react';
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
import { RectButton } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
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
import { updateAvatar } from '../../store/modules/user/actions';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef(null);

  const naviation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, sePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUpdateAvatar, setloadingUpdateAvatar] = useState(false);
  const [errorSingnUp, setErrorSingnUp] = useState(false);
  const [image, setimage] = useState('');
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalPreviewPhoto, setModalPreviewPhoto] = useState(false);

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

  const handleSaveProfile = useCallback(async (data: ProfileFormData) => {
    try {
      setLoading(true);
      console.log(data);

      Alert.alert(
        'Perfil atualizado com sucesso!',
        'As informações do perfil foram atualizadas.',
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
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

          <InputContainer>
            <Input
              value={user?.user.name || name}
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
              value={user?.user.email || email}
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
              value={password}
              onChangeText={sePassword}
              secureTextEntry
              placeholder="Senha"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              ref={passwordRef}
            />
            <IconKey />
          </InputContainer>
          <InputContainer>
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirmar Senha"
              returnKeyType="send"
              onSubmitEditing={() => {}}
              ref={confirmPasswordRef}
            />
            <IconKey />
          </InputContainer>

          <Button loading={loading} onPress={() => {}}>
            <ButtonText>{loading ? 'Atualizar...' : 'Atualizar'}</ButtonText>
          </Button>
        </Container>
      </ScrollView>

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
    </KeyboardAvoidingView>
  );
};

export default Profile;
