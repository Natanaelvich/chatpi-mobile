export interface UserProps {
  user: {
    name: string;
    email: string;
    id: string;
  };
  token: string;
}
interface ReducerProps {
  type: string;
  signinError: boolean;
  loadingSingin: boolean;
  user: UserProps;
}
interface InitialStateUserProps {
  signedIn: boolean;
  user: UserProps | null;
  signinError: boolean;
  loadingSingin: boolean;
  socketId: string | null;
  token_expo: string | null;
}

const initialState = {
  signedIn: false,
  user: null,
  signinError: false,
  loadingSingin: false,
  socketId: null,
  token_expo: null,
} as InitialStateUserProps;

export default (
  state = initialState,
  { type, signinError, loadingSingin, user }: ReducerProps,
): InitialStateUserProps => {
  switch (type) {
    case '@user/SIGN_IN_SUCCESS':
      return {
        ...state,
        signedIn: true,
        user,
      };

    case '@user/SIGN_OUT':
      return { ...state, signedIn: false, user: null };

    case '@user/SIGN_ERROR':
      return { ...state, signinError };

    case '@user/LOADING_SINGIN':
      return { ...state, loadingSingin };

    default:
      return state;
  }
};
