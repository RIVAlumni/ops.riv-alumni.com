import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { AggregationState, LoadAggregationsAsync } from './AggregationTypes';

const initialState: AggregationState = {
  data: {
    usersCount: 0,
    membersCount: 0,
    eventsCount: 0,
    participationsCount: 0,
  },
  loading: false,
  errors: [],
};

const AggregationReducer = createReducer<AggregationState, AppActions>(
  initialState
)
  .handleAction(LoadAggregationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LoadAggregationsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(LoadAggregationsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LoadAggregationsAsync.cancel, () => initialState);

export { AggregationReducer };
