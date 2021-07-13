import { UserContent } from './reducer';

export const updateAvatar = (
  avatar_url: string,
): {
  type: string;
  avatar_url: string;
} => ({
  type: '@user/UPDATE_AVATAR',
  avatar_url,
});
export const signInRequest = (
  email: string,
  password: string,
): {
  type: string;
  payload: Record<string, unknown>;
} => ({
  type: '@user/SIGN_IN_REQUEST',
  payload: { email, password },
});
export const signInSuccess = (
  data: Record<string, unknown>,
): {
  type: string;
  data: Record<string, unknown>;
} => ({
  type: '@user/SIGN_IN_SUCCESS',
  data,
});

export const signOut = (): { type: string } => ({
  type: '@user/SIGN_OUT',
});

export const signInError = (
  signinError: boolean,
): {
  type: string;
  signinError: boolean;
} => ({
  type: '@user/SIGN_ERROR',
  signinError,
});

export const setLoadingSingin = (
  loadingSingin: boolean,
): {
  type: string;
  loadingSingin: boolean;
} => ({
  type: '@user/LOADING_SINGIN',
  loadingSingin,
});

export const updateUser = (
  userContent: UserContent,
): {
  type: string;
  userContent: UserContent;
} => ({
  type: '@user/UPDATE_USER',
  userContent,
});
