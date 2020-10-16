import { User } from '../models';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_WITH_MICROSOFT = 'SIGN_IN_WITH_MICROSOFT';

export const CURRENT_USER_RESET = 'CURRENT_USER_RESET';
export const CURRENT_USER_LOAD = 'CURRENT_USER_LOAD';
export const CURRENT_USER_SET = 'CURRENT_USER_SET';

export interface SignOutUserAction {
  type: typeof SIGN_OUT_USER;
}

export interface SignInWithGoogleAction {
  type: typeof SIGN_IN_WITH_GOOGLE;
}

export interface SignInWithMicrosoftAction {
  type: typeof SIGN_IN_WITH_MICROSOFT;
}

export interface CurrentUserResetAction {
  type: typeof CURRENT_USER_RESET;
}

export interface CurrentUserLoadAction {
  type: typeof CURRENT_USER_LOAD;
}

export interface CurrentUserSetAction {
  type: typeof CURRENT_USER_SET;
  user: User;
}

export type CurrentUserActionTypes =
  | SignOutUserAction
  | SignInWithGoogleAction
  | SignInWithMicrosoftAction
  | CurrentUserResetAction
  | CurrentUserLoadAction
  | CurrentUserSetAction;
