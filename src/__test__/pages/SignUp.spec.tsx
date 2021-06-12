/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import SingnUp from '../../pages/SingnUp';
import { renderWithReduxAndTheme } from '../test-utils';

const mockedNavigate = jest.fn();
const mockedGoback = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate, goBack: mockedGoback }),
}));

describe('SignUp page', () => {
  it('Should contains name/email/password inputs', async () => {
    const { getByPlaceholderText } = renderWithReduxAndTheme(<SingnUp />, {
      initialState: {},
    });

    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('Should to able navigate to back signin', async () => {
    const { getByText } = renderWithReduxAndTheme(<SingnUp />, {
      initialState: {},
    });

    const buttonElement = getByText('Voltar para login');

    fireEvent.press(buttonElement);

    expect(mockedGoback).toHaveBeenCalledTimes(1);
  });

  it('Should to able navigate to ForgotPassword', async () => {
    const { getByText } = renderWithReduxAndTheme(<SingnUp />, {
      initialState: {},
    });

    const buttonElement = getByText('Esqueci minha senha');

    fireEvent.press(buttonElement);

    expect(mockedNavigate).toBeCalledWith('ForgotPassword');
  });

  // it('Should to able to do the signin', async () => {
  //   const { getByPlaceholderText, getByText } = renderWithReduxAndTheme(
  //     <SingnUp />,
  //     {
  //       initialState: {},
  //     },
  //   );

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, '');
  //   fireEvent.changeText(passwordField, '');

  //   fireEvent.press(buttonElement);

  //   expect(getByText('Entrando')).toBeTruthy();
  // });
});
