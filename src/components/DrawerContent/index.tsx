import React from 'react';
import { View, Switch } from 'react-native';
import {
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store/modules/rootReducer';
import {
  Avatar,
  DrawerContent as DrawerContentStyle,
  UserInfoSection,
  Title,
  Caption,
  DrawerSection,
  BottomDrawerSection,
  Preference,
  PreferenceText,
  IconMoob,
  IconUser,
  IconDelete,
} from './styles';
import { signOut } from '../../store/modules/user/actions';
import { setDarkMode } from '../../store/modules/options/actions';
import getAvatarUrl from '../../utils/getAvatarUrl';
import { modalDeleteDataVisible } from '../../store/modules/utils/actions';
import { BASE_URL } from '../../config';

const DrawerContent: React.FC<DrawerContentOptions> = props => {
  const dispatch = useDispatch();

  const { data: user } = useSelector((state: RootState) => state.user);
  const { darkMode } = useSelector((state: RootState) => state.options);

  async function handleSiginout(): Promise<void> {
    props.navigation.closeDrawer();

    await AsyncStorage.removeItem('@user:data');
    dispatch(signOut());
  }

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#19191D' : '#fff' }}>
      <DrawerContentScrollView {...props}>
        <DrawerContentStyle>
          <UserInfoSection>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar
                source={{
                  uri:
                    getAvatarUrl(user?.user.avatar_url) ||
                    `${BASE_URL}/myAvatars/${user?.user.id}`,
                }}
              />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                  width: '70%',
                  paddingRight: 12,
                  overflow: 'hidden',
                }}
              >
                <Title>{user?.user.name}</Title>
                <Caption>{user?.user.email}</Caption>
              </View>
            </View>
          </UserInfoSection>

          <DrawerSection>
            <Preference onPress={() => props.navigation.navigate('Profile')}>
              <IconUser />
              <PreferenceText>Perfil</PreferenceText>
            </Preference>
            <Preference
              onPress={() => {
                dispatch(setDarkMode(!darkMode));
              }}
            >
              <IconMoob />
              <PreferenceText>Tema Escuro</PreferenceText>
              <Switch
                trackColor={{ false: '#ddd', true: '#3A3A44' }}
                thumbColor="#242238"
                value={darkMode}
              />
            </Preference>
            <Preference
              onPress={() => {
                dispatch(modalDeleteDataVisible(true));
              }}
            >
              <IconDelete />
              <PreferenceText>Limpar Dados</PreferenceText>
            </Preference>
          </DrawerSection>
        </DrawerContentStyle>
      </DrawerContentScrollView>

      <BottomDrawerSection>
        <DrawerItem
          icon={({ size }) => (
            <MaterialIcons
              name="power-settings-new"
              color="#de595c"
              size={size}
            />
          )}
          labelStyle={{ color: '#de595c', fontSize: 16 }}
          label="Sair"
          onPress={handleSiginout}
        />
      </BottomDrawerSection>
    </View>
  );
};

export default DrawerContent;
