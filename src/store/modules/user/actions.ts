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
  user: Record<string, unknown>,
): {
  type: string;
  user: Record<string, unknown>;
} => ({
  type: '@user/SIGN_IN_SUCCESS',
  user,
});

export const signOutRequest = (): { type: string } => ({
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
