import {
  RESET_AUTH_USER,
  LOAD_AUTH_USER_REQUEST,
  LOAD_AUTH_USER_SUCCESS,
  LOAD_AUTH_USER_FAILURE,
  AuthUserState,
  AuthUserStatus,
  AuthUserActionTypes,
} from './AuthUserTypes';

const initialAuthUserState: AuthUserState = null;
const initialAuthUserStatusState: AuthUserStatus = {
  loading: false,
  error: null,
};

const AuthUserReducer = (
  state: AuthUserState = initialAuthUserState,
  action: AuthUserActionTypes
): AuthUserState => {
  switch (action.type) {
    case RESET_AUTH_USER:
      return initialAuthUserState;
    case LOAD_AUTH_USER_SUCCESS:
      return { ...action.user };
    default:
      return state;
  }
};

const AuthUserStatusReducer = (
  state: AuthUserStatus = initialAuthUserStatusState,
  action: AuthUserActionTypes
): AuthUserStatus => {
  switch (action.type) {
    case RESET_AUTH_USER:
      return initialAuthUserStatusState;
    case LOAD_AUTH_USER_REQUEST:
      return { ...initialAuthUserStatusState, loading: true };
    case LOAD_AUTH_USER_SUCCESS:
      return initialAuthUserStatusState;
    case LOAD_AUTH_USER_FAILURE:
      return {
        ...initialAuthUserStatusState,
        error: { ...action.error },
      };
    default:
      return state;
  }
};

export { AuthUserReducer, AuthUserStatusReducer };
