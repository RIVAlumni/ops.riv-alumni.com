import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { AuthUserState, AuthUserAsync } from './AuthUserTypes';

const initialState: AuthUserState = { user: null, loading: false, errors: [] };

const AuthUserReducer = createReducer<AuthUserState, AppActions>(initialState)
  .handleAction(AuthUserAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(AuthUserAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.user = action.payload;
    })
  )
  .handleAction(AuthUserAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(AuthUserAsync.cancel, () => initialState);

export { AuthUserReducer };
