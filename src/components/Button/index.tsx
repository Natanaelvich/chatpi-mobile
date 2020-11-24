import React from 'react';

import { Button as ButtonStyle } from './styles';

const Button: React.FC = ({ children, ...rest }) => {
  return <ButtonStyle {...rest}>{children}</ButtonStyle>;
};

export default Button;
