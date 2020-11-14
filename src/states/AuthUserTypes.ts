import { auth } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { User } from '../models';

export const LOAD_AUTH_USER_CANCEL = 'LOAD_AUTH_USER_CANCEL';
export const LOAD_AUTH_USER_REQUEST = 'LOAD_AUTH_USER_REQUEST';
export const LOAD_AUTH_USER_SUCCESS = 'LOAD_AUTH_USER_SUCCESS';
export const LOAD_AUTH_USER_FAILURE = 'LOAD_AUTH_USER_FAILURE';

export const LoadAuthUserAsync = createAsyncAction(
  LOAD_AUTH_USER_REQUEST,
  LOAD_AUTH_USER_SUCCESS,
  LOAD_AUTH_USER_FAILURE,
  LOAD_AUTH_USER_CANCEL
)<undefined, User, auth.AuthError, undefined>();

export type AuthUserState = User | null;

// export type AuthUserActionTypes =
//   | ResetAuthUserAction
//   | LoadAuthUserRequestAction
//   | LoadAuthUserSuccessAction
//   | LoadAuthUserFailureAction;
