export interface UserContent {
  name: string;
  email: string;
  id: string;
  avatar_url: string;
  clerk: string | null;
}

export interface UserProps {
  user: UserContent;
  token: string;
}
interface ReducerProps {
  type: string;
  signinError: boolean;
  loadingSingin: boolean;
  data: UserProps;
  userContent: UserContent;
  avatar_url: string;
}
interface InitialStateUserProps {
  signedIn: boolean;
  data: UserProps | null;
  signinError: boolean;
  loadingSingin: boolean;
  socketId: string | null;
  token_expo: string | null;
}

const initialState = {
  signedIn: false,
  data: null,
  signinError: false,
  loadingSingin: false,
  socketId: null,
  token_expo: null,
} as InitialStateUserProps;

export default (
  state = initialState,
  {
    type,
    signinError,
    loadingSingin,
    data,
    avatar_url,
    userContent,
  }: ReducerProps,
): InitialStateUserProps => {
  switch (type) {
    case '@user/UPDATE_AVATAR':
      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, avatar_url },
        },
      };
    case '@user/SIGN_IN_SUCCESS':
      return {
        ...state,
        signedIn: true,
        data,
      };
    case '@user/UPDATE_USER':
      return {
        ...state,
        user: { ...state.data, user: userContent },
      };

    case '@user/SIGN_OUT':
      return { ...state, signedIn: false, data: null };

    case '@user/SIGN_ERROR':
      return { ...state, signinError };

    case '@user/LOADING_SINGIN':
      return { ...state, loadingSingin };

    default:
      return state;
  }
};
