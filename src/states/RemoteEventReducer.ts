import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { RemoteEventState, RemoteEventsAsync } from './RemoteEventTypes';

const initialState: RemoteEventState = { data: [], loading: false, errors: [] };

const RemoteEventReducer = createReducer<RemoteEventState, AppActions>(
  initialState
)
  .handleAction(RemoteEventsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(RemoteEventsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(RemoteEventsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(RemoteEventsAsync.cancel, () => initialState);

export { RemoteEventReducer };
