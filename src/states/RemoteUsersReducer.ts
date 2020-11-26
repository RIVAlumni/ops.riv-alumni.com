import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { RemoteUsersState, LoadRemoteUsersAsync } from './RemoteUsersTypes';

const initialState: RemoteUsersState = {
  data: [],
  loading: false,
  errors: [],
};

const RemoteUsersReducer = createReducer<RemoteUsersState, AppActions>(
  initialState
)
  .handleAction(LoadRemoteUsersAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LoadRemoteUsersAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(LoadRemoteUsersAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LoadRemoteUsersAsync.cancel, () => initialState);

export { RemoteUsersReducer };
