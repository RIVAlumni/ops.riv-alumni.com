import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { RemoteMembersState, RemoteMembersAsync } from './RemoteMembersTypes';

const initialState: RemoteMembersState = {
  data: [],
  loading: false,
  errors: [],
};

const RemoteMembersReducer = createReducer<RemoteMembersState, AppActions>(
  initialState
)
  .handleAction(RemoteMembersAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(RemoteMembersAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(RemoteMembersAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(RemoteMembersAsync.cancel, () => initialState);

export { RemoteMembersReducer };
