import { auth } from 'firebase/app';
import { User, AppStatus } from '../models';

export const RESET_AUTH_USER = 'RESET_AUTH_USER';
export const LOAD_AUTH_USER_REQUEST = 'LOAD_AUTH_USER_REQUEST';
export const LOAD_AUTH_USER_SUCCESS = 'LOAD_AUTH_USER_SUCCESS';
export const LOAD_AUTH_USER_FAILURE = 'LOAD_AUTH_USER_FAILURE';

export const ResetAuthUser = (): ResetAuthUserAction => ({
  type: RESET_AUTH_USER,
});

export const LoadAuthUserRequest = (): LoadAuthUserRequestAction => ({
  type: LOAD_AUTH_USER_REQUEST,
});

export const LoadAuthUserSuccess = (user: User): LoadAuthUserSuccessAction => ({
  type: LOAD_AUTH_USER_SUCCESS,
  user,
});

export const LoadAuthUserFailure = (
  error: auth.AuthError
): LoadAuthUserFailureAction => ({
  type: LOAD_AUTH_USER_FAILURE,
  error,
});

export interface ResetAuthUserAction {
  type: typeof RESET_AUTH_USER;
}

export interface LoadAuthUserRequestAction {
  type: typeof LOAD_AUTH_USER_REQUEST;
}

export interface LoadAuthUserSuccessAction {
  type: typeof LOAD_AUTH_USER_SUCCESS;
  user: User;
}

export interface LoadAuthUserFailureAction {
  type: typeof LOAD_AUTH_USER_FAILURE;
  error: auth.AuthError;
}

export type AuthUserState = User | null;
export type AuthUserStatus = AppStatus;

export type AuthUserActionTypes =
  | ResetAuthUserAction
  | LoadAuthUserRequestAction
  | LoadAuthUserSuccessAction
  | LoadAuthUserFailureAction;
