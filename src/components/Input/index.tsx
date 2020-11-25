import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from './styles';

const Input: React.FC<TextInputProps> = ({ ...rest }) => {
  return <TextInput {...rest} />;
};

export default Input;
