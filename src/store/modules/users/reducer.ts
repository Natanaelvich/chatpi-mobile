export interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  clerk: string | null;
}
interface ReducerProps {
  users: UserProps[];
  loading: boolean;
  type: string;
}
interface InitialStateUsersProps {
  users: UserProps[];
  loading: boolean;
}

const initialState = {
  users: [],
  loading: false,
} as InitialStateUsersProps;

export default (
  state = initialState,
  { type, users, loading }: ReducerProps,
): InitialStateUsersProps => {
  switch (type) {
    case '@users/SET_LOADING':
      return {
        ...state,
        loading,
      };
    case '@users/ADD_USERS':
      return {
        ...state,
        users,
      };

    default:
      return state;
  }
};
