import { UserProps } from '../user/reducer';

export const addAttendants = (
  attendants: UserProps[],
): {
  type: string;
  attendants: UserProps[];
} => ({
  type: '@attendants/ADD_ATTENDANTS',
  attendants,
});

export const addUsers = (
  users: UserProps[],
): {
  type: string;
  users: UserProps[];
} => ({
  type: '@attendants/ADD_USERS',
  users,
});

export const getAttendants = (): {
  type: string;
} => ({
  type: '@attendants/GET_ATTENDANTS',
});

export const getUsers = (): {
  type: string;
} => ({
  type: '@attendants/GET_USERS',
});
