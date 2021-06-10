/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import SingnIn from '../../pages/SingnIn';
import { renderWithRedux } from '../test-utils';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('SignIn page', () => {
  it('Should contains email/password inputs', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SingnIn />, {
      initialState: {
        user: {
          signinError: false,
          loadingSingin: false,
        },
      },
    });

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
