import { UserProps } from '../auth/reducer';

export const setLoading = (
  loading: boolean,
): {
  type: string;
  loading: boolean;
} => ({
  type: '@users/SET_LOADING',
  loading,
});

export const addUsers = (
  users: UserProps[],
): {
  type: string;
  users: UserProps[];
} => ({
  type: '@users/ADD_USERS',
  users,
});

export const getUsers = (): {
  type: string;
} => ({
  type: '@users/GET_USERS',
});
