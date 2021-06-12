/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import SingnUp from '../../pages/SingnUp';
import { renderWithReduxAndTheme } from '../test-utils';
import api from '../../services/api';

const mockedNavigate = jest.fn();
const mockedGoback = jest.fn();
const apiMock = new MockAdapter(api);

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

  it('Should to able navigate to back signin', () => {
    const { getByText } = renderWithReduxAndTheme(<SingnUp />, {
      initialState: {},
    });

    const buttonElement = getByText('Voltar para login');

    fireEvent.press(buttonElement);

    expect(mockedGoback).toHaveBeenCalledTimes(1);
  });

  it('Should to able to signup', () => {
    const { getByText } = renderWithReduxAndTheme(<SingnUp />, {
      initialState: {},
    });

    const buttonElement = getByText('Cadastrar');

    fireEvent.press(buttonElement);

    expect(getByText('Verificação Profissional')).toBeTruthy();
  });

  it('Should to able to confirm modal', async () => {
    apiMock.onPost('users').reply(200, {
      name: 'name',
      email: 'email',
      password: 'password',
      clerk: '',
    });

    const { getByText } = renderWithReduxAndTheme(<SingnUp />, {
      initialState: {},
    });

    const buttonElementSignup = getByText('Cadastrar');

    fireEvent.press(buttonElementSignup);

    const buttonElement = getByText('Verificar');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('SingnIn');
    });
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
