import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { EventState, LoadEventsAsync } from './EventTypes';

const initialState: EventState = { data: [], loading: false, errors: [] };

const EventReducer = createReducer<EventState, AppActions>(initialState)
  .handleAction(LoadEventsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LoadEventsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.data = action.payload;
    })
  )
  .handleAction(LoadEventsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LoadEventsAsync.cancel, () => initialState);

export { EventReducer };
