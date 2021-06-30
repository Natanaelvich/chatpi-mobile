/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import SignIn from '../../pages/SingnIn';
import RenderWithProviders from '../RenderWithProviders';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('SignIn page', () => {
  it('Should contains email/password inputs', () => {
    const { getByPlaceholderText } = render(<SignIn />, {
      wrapper: RenderWithProviders,
    });

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('Should to able navigate to signIn', () => {
    const { getByText } = render(<SignIn />, {
      wrapper: RenderWithProviders,
    });

    const buttonElement = getByText('Criar uma conta');

    fireEvent.press(buttonElement);

    expect(mockedNavigate).toBeCalledWith('SingnUp');
  });

  it('Should to able navigate to ForgotPassword', () => {
    const { getByText } = render(<SignIn />, {
      wrapper: RenderWithProviders,
    });

    const buttonElement = getByText('Esqueci minha senha');

    fireEvent.press(buttonElement);

    expect(mockedNavigate).toBeCalledWith('ForgotPassword');
  });

  it('Should to able to do the signin', async () => {
    const { getByPlaceholderText, getByText, debug } = render(<SignIn />, {
      wrapper: RenderWithProviders,
    });

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, '');
    fireEvent.changeText(passwordField, '');

    fireEvent.press(buttonElement);

    debug();
    expect(getByText('Entrando')).toBeTruthy();
  });
});
