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
  refresh_token: string;
}
interface ReducerProps {
  type: string;
  signinError: { error: false; messageError: '' };
  loadingSingin: boolean;
  data: UserProps | undefined;
  userContent: UserContent;
  avatar_url: string;
  tokens: {
    token: string;
    refresh_token: string;
  };
}
interface InitialStateUserProps {
  signedIn: boolean;
  data: UserProps | undefined;
  signinError: { error: false; messageError: '' };
  loadingSingin: boolean;
  socketId: string | null;
  token_expo: string | null;
}

const initialState = {
  signedIn: false,
  data: undefined,
  signinError: { error: false, messageError: '' },
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
    tokens,
  }: ReducerProps,
): InitialStateUserProps => {
  switch (type) {
    case '@user/UPDATE_AVATAR': {
      if (!state.data) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, avatar_url },
        },
      };
    }
    case '@user/UPDATE_TOKENS': {
      if (!state.data) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...tokens,
        },
      };
    }
    case '@user/SIGN_IN_SUCCESS':
      return {
        ...state,
        signedIn: true,
        data,
      };
    case '@user/UPDATE_USER': {
      if (!state.data) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, ...userContent },
        },
      };
    }

    case '@user/SIGN_OUT':
      return { ...state, signedIn: false, data: undefined };

    case '@user/SIGN_ERROR':
      return { ...state, signinError };

    case '@user/LOADING_SINGIN':
      return { ...state, loadingSingin };

    default:
      return state;
  }
};
