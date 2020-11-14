import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { AuthUserState, LoadAuthUserAsync } from './AuthUserTypes';

const initialState: AuthUserState = null;

const AuthUserReducer = createReducer<AuthUserState, AppActions>(initialState)
  .handleAction(LoadAuthUserAsync.cancel, () => initialState)
  .handleAction(LoadAuthUserAsync.success, (_state, action) => ({
    ...action.payload,
  }));

export { AuthUserReducer };
