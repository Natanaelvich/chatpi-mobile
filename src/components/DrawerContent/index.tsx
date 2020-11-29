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

const DrawerContent: React.FC<DrawerContentOptions> = props => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <View style={{ flex: 1 }}>
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
            <RectButton>
              <Preference>
                <Title>Tema Escuro</Title>
                <View pointerEvents="none">
                  <Switch />
                </View>
              </Preference>
            </RectButton>
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
