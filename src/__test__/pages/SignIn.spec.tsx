/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import SingnIn from '../../pages/SingnIn';
import { renderWithReduxAndTheme } from '../test-utils';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('SignIn page', () => {
  it('Should contains email/password inputs', async () => {
    const { getByPlaceholderText } = renderWithReduxAndTheme(<SingnIn />, {
      initialState: {},
    });

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('Should to able navigate to signup', async () => {
    const { getByText } = renderWithReduxAndTheme(<SingnIn />, {
      initialState: {},
    });

    const buttonElement = getByText('Criar uma conta');

    fireEvent.press(buttonElement);

    expect(mockedNavigate).toBeCalledWith('SingnUp');
  });

  it('Should to able navigate to ForgotPassword', async () => {
    const { getByText } = renderWithReduxAndTheme(<SingnIn />, {
      initialState: {},
    });

    const buttonElement = getByText('Esqueci minha senha');

    fireEvent.press(buttonElement);

    expect(mockedNavigate).toBeCalledWith('ForgotPassword');
  });

  it('Should to able to do the signin', async () => {
    const { getByPlaceholderText, getByText } = renderWithReduxAndTheme(
      <SingnIn />,
      {
        initialState: {},
      },
    );

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, '');
    fireEvent.changeText(passwordField, '');

    fireEvent.press(buttonElement);

    expect(getByText('Entrando')).toBeTruthy();
  });
});
