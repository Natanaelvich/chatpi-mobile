export interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  clerk: string | null;
}
interface ReducerProps {
  attendants: UserProps[];
  users: UserProps[];
  type: string;
}
interface InitialStateAttendantsProps {
  attendants: UserProps[];
  users: UserProps[];
}

const initialState = {
  attendants: [],
  users: [],
} as InitialStateAttendantsProps;

export default (
  state = initialState,
  { type, attendants, users }: ReducerProps,
): InitialStateAttendantsProps => {
  switch (type) {
    case '@attendants/ADD_ATTENDANTS':
      return {
        ...state,
        attendants,
      };
    case '@attendants/ADD_USERS':
      return {
        ...state,
        users,
      };

    default:
      return state;
  }
};
