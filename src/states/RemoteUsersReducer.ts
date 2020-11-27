import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { RemoteUsersState, RemoteUsersAsync } from './RemoteUsersTypes';

const initialState: RemoteUsersState = {
  data: [],
  loading: false,
  errors: [],
};

const RemoteUsersReducer = createReducer<RemoteUsersState, AppActions>(
  initialState
)
  .handleAction(RemoteUsersAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(RemoteUsersAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(RemoteUsersAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(RemoteUsersAsync.cancel, () => initialState);

export { RemoteUsersReducer };
