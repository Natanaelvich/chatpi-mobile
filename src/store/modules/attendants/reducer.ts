export interface UserProps {
  name: string;
  email: string;
  token: string;
}
interface ReducerProps {
  attendants: UserProps[];
}
interface InitialStateProps {
  attendants: UserProps[];
  type: string;
}

const initialState = {
  attendants: [],
};

export default (
  state = initialState,
  { type, attendants }: InitialStateProps,
): ReducerProps => {
  switch (type) {
    case '@attendants/ADD_ATTENDANTS':
      return {
        ...state,
        attendants,
      };

    default:
      return state;
  }
};
