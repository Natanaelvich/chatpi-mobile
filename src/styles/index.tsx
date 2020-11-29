import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RootState } from '../store/modules/rootReducer';
import dark from './theme/dark';
import light from './theme/light';

const GlobalStyles: React.FC = ({ children }) => {
  const { darkMode } = useSelector((state: RootState) => state.options);
  return (
    <ThemeProvider theme={darkMode ? dark : light}>{children}</ThemeProvider>
  );
};

export default GlobalStyles;
