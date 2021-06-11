/* eslint-disable import/no-extraneous-dependencies */
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
});
