import React from 'react';
import { View, Switch } from 'react-native';
import {
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from 'expo-vector-icons';
import { RectButton } from 'react-native-gesture-handler';
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
} from './styles';
import { signOutRequest } from '../../store/modules/user/actions';
import { setDarkMode } from '../../store/modules/options/actions';

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
                  uri: `${env.API_URL}/myAvatars/${user?.user.id}`,
                }}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title>{user?.user.name}</Title>
                <Caption>{user?.user.email}</Caption>
              </View>
            </View>
          </UserInfoSection>

          <DrawerSection>
            <Preference>
              <Title>Tema Escuro</Title>
              <Switch
                // trackColor={{ false: '#E66A05', true: '#E66A05' }}
                // thumbColor="#BF5804"
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
          labelStyle={{ color: '#de595c' }}
          label="Sair"
          onPress={() => dispatch(signOutRequest())}
        />
      </BottomDrawerSection>
    </View>
  );
};

export default DrawerContent;
