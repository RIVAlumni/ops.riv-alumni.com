import {
  RESET_CURRENT_USER,
  SET_CURRENT_USER,
  CurrentUserState,
  CurrentUserActionTypes,
} from './CurrentUserTypes';

const initialState: CurrentUserState = null;

const CurrentUserReducer = (
  state: CurrentUserState = initialState,
  action: CurrentUserActionTypes
): CurrentUserState => {
  switch (action.type) {
    case RESET_CURRENT_USER:
      return initialState;
    case SET_CURRENT_USER:
      return { ...action.user };
    default:
      return state;
  }
};

export { CurrentUserReducer };
