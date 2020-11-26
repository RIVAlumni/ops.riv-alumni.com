import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { AuthUserState, LoadAuthUserAsync } from './AuthUserTypes';

const initialState: AuthUserState = { user: null, loading: false, errors: [] };

const AuthUserReducer = createReducer<AuthUserState, AppActions>(initialState)
  .handleAction(LoadAuthUserAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LoadAuthUserAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.user = action.payload;
    })
  )
  .handleAction(LoadAuthUserAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LoadAuthUserAsync.cancel, () => initialState);

export { AuthUserReducer };
