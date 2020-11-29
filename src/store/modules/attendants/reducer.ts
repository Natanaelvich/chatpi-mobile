export interface UserProps {
  name: string;
  email: string;
  token: string;
}
interface ReducerProps {
  attendants: UserProps[];
  type: string;
}
interface InitialStateAttendantsProps {
  attendants: UserProps[];
}

const initialState = {
  attendants: [],
} as InitialStateAttendantsProps;

export default (
  state = initialState,
  { type, attendants }: ReducerProps,
): InitialStateAttendantsProps => {
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
