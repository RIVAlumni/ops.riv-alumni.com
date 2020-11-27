import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import {
  RemoteAggregationState,
  RemoteAggregationsAsync,
} from './RemoteAggregationTypes';

const initialState: RemoteAggregationState = {
  data: {
    usersCount: 0,
    membersCount: 0,
    eventsCount: 0,
    participationsCount: 0,
  },
  loading: false,
  errors: [],
};

const RemoteAggregationReducer = createReducer<
  RemoteAggregationState,
  AppActions
>(initialState)
  .handleAction(RemoteAggregationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(RemoteAggregationsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(RemoteAggregationsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(RemoteAggregationsAsync.cancel, () => initialState);

export { RemoteAggregationReducer };
