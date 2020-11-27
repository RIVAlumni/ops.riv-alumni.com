import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { LocalEventState, LocalEventsAsync } from './LocalEventTypes';

const initialState: LocalEventState = { data: [], loading: false, errors: [] };

const LocalEventReducer = createReducer<LocalEventState, AppActions>(
  initialState
)
  .handleAction(LocalEventsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LocalEventsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(LocalEventsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LocalEventsAsync.cancel, () => initialState);

export { LocalEventReducer };
