import { User } from '../models';

export const CURRENT_USER_RESET = 'CURRENT_USER_RESET';
export const CURRENT_USER_LOAD = 'CURRENT_USER_LOAD';
export const CURRENT_USER_SET = 'CURRENT_USER_SET';

export const CurrentUserReset = (): CurrentUserResetAction => ({
  type: CURRENT_USER_RESET,
});

export const CurrentUserLoad = (): CurrentUserLoadAction => ({
  type: CURRENT_USER_LOAD,
});

export const CurrentUserSet = (user: User): CurrentUserSetAction => ({
  type: CURRENT_USER_SET,
  user,
});

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
  | CurrentUserResetAction
  | CurrentUserLoadAction
  | CurrentUserSetAction;
