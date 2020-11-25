export interface UserProps {
  name: string;
  email: string;
  token: string;
}
interface ReducerProps {
  type: string;
  signinError: boolean;
  loadingSingin: boolean;
  user: UserProps;
}
interface InitialStateProps {
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
};

export default (
  state = initialState,
  { type, signinError, loadingSingin, user }: ReducerProps,
): InitialStateProps => {
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
