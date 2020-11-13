import {
  RESET_AUTH_USER,
  LOAD_AUTH_USER_SUCCESS,
  AuthUserState,
  AuthUserActionTypes,
} from './AuthUserTypes';

const initialState: AuthUserState = null;

const AuthUserReducer = (
  state: AuthUserState = initialState,
  action: AuthUserActionTypes
): AuthUserState => {
  switch (action.type) {
    case RESET_AUTH_USER:
      return initialState;
    case LOAD_AUTH_USER_SUCCESS:
      return { ...action.user };
    default:
      return state;
  }
};

export { AuthUserReducer };
