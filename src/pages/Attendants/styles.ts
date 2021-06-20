import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container: React.FC = styled.View`
  position: relative;
  flex: 1;
  background: ${props => props.theme.colors.primary};
`;
export const Content: React.FC = styled.View`
  flex: 1;
  border-top-right-radius: ${RFValue(44)}px;
  border-top-left-radius: ${RFValue(44)}px;
  background: ${props => props.theme.colors.background};
  padding-top: ${RFValue(28)}px;
`;
export const ContentScroll = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'always',
  contentContainerStyle: { paddingHorizontal: 12 },
})<ScrollViewProps>``;
export const ContentTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(18)}px;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${RFValue(21)}px ${RFValue(21)}px;
`;
export const Section: React.FC = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin: ${RFValue(12)}px 0;
`;
export const IconNurse: React.FC = styled(FontAwesome5).attrs(props => ({
  name: 'user-nurse',
  size: 24,
  color: props.theme.colors.text,
}))``;
export const IconBrain: React.FC = styled(MaterialCommunityIcons).attrs(
  props => ({
    name: 'brain',
    size: 24,
    color: props.theme.colors.text,
  }),
)``;
export const SectionTitle: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.text};
  margin-right: ${RFValue(12)}px;
`;
export const Box = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(24)}px;
`;
export const BoxAvatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
`;
export const BoxTextContainer: React.FC = styled.View`
  margin-left: ${RFValue(16)}px;
  flex: 1;
`;
export const BoxTitle: React.FC = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(6)}px;

  color: ${props => props.theme.colors.text};
`;
export const BoxDesc: React.FC = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;

  color: #b5b5b5;
`;
export const IconNext = styled(MaterialIcons).attrs(props => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: props.theme.colors.text,
}))``;
