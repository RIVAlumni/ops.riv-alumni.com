import { User } from '../models';

export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const ResetCurrentUser = (): ResetCurrentUserAction => ({
  type: RESET_CURRENT_USER,
});

export const LoadCurrentUser = (): LoadCurrentUserAction => ({
  type: LOAD_CURRENT_USER,
});

export const SetCurrentUser = (user: User): SetCurrentUserAction => ({
  type: SET_CURRENT_USER,
  user,
});

export interface ResetCurrentUserAction {
  type: typeof RESET_CURRENT_USER;
}

export interface LoadCurrentUserAction {
  type: typeof LOAD_CURRENT_USER;
}

export interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  user: User;
}

export type CurrentUserState = User | null;

export type CurrentUserActionTypes =
  | ResetCurrentUserAction
  | LoadCurrentUserAction
  | SetCurrentUserAction;
