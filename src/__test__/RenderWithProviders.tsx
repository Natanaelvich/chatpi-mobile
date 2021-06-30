import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components/native';
import rootReducer from '../store/modules/rootReducer';
import light from '../styles/theme/light';

const store = createStore(rootReducer);

const RenderWithProviders: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>{children}</ThemeProvider>
    </Provider>
  );
};

export default RenderWithProviders;
