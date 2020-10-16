import { User } from '../models';
import {
  CURRENT_USER_RESET,
  CURRENT_USER_SET,
  CurrentUserActionTypes,
} from './CurrentUserTypes';

const initialState: User | null = null;

const CurrentUserReducer = (
  state: User | null = initialState,
  action: CurrentUserActionTypes
): User | null => {
  switch (action.type) {
    case CURRENT_USER_RESET:
      return initialState;
    case CURRENT_USER_SET:
      return action.user;
    default:
      return state;
  }
};

export { CurrentUserReducer };
