import React from 'react';
import { View, Switch } from 'react-native';
import {
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from 'expo-vector-icons';
import { RootState } from '../../store/modules/rootReducer';
import env from '../../../env';
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
} from './styles';
import { signOutRequest } from '../../store/modules/user/actions';
import { setDarkMode } from '../../store/modules/options/actions';
import getAvatarUrl from '../../utils/getAvatarUrl';

const DrawerContent: React.FC<DrawerContentOptions> = props => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { darkMode } = useSelector((state: RootState) => state.options);

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
                    `${env.API_URL}/myAvatars/${user?.user.id}`,
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
            <Preference>
              <IconUser />
              <PreferenceText>Perfil</PreferenceText>
            </Preference>
            <Preference>
              <IconMoob />
              <PreferenceText>Tema Escuro</PreferenceText>
              <Switch
                trackColor={{ false: '#ddd', true: '#3A3A44' }}
                thumbColor="#242238"
                value={darkMode}
                onValueChange={e => {
                  dispatch(setDarkMode(e));
                }}
              />
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
          onPress={() => dispatch(signOutRequest())}
        />
      </BottomDrawerSection>
    </View>
  );
};

export default DrawerContent;
