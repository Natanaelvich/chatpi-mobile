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

export const getAttendants = (): {
  type: string;
} => ({
  type: '@attendants/GET_ATTENDANTS',
});
