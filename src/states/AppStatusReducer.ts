import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { LoadAuthUserAsync } from './AuthUserTypes';
import { LoadAggregationsAsync } from './AggregationTypes';

interface AppStatusState {
  loading: {
    auth: boolean;
    aggregation: boolean;
  };
  errors: unknown[];
}

const initialState: AppStatusState = {
  loading: {
    auth: false,
    aggregation: false,
  },
  errors: [],
};

const AppStatusReducer = createReducer<AppStatusState, AppActions>(initialState)
  .handleAction(
    [LoadAuthUserAsync.cancel, LoadAuthUserAsync.success],
    (state, _action) =>
      produce(state, (draft) => {
        draft.loading.auth = false;
      })
  )
  .handleAction(
    [LoadAggregationsAsync.cancel, LoadAggregationsAsync.success],
    (state, _action) =>
      produce(state, (draft) => {
        draft.loading.aggregation = false;
      })
  )
  .handleAction(LoadAuthUserAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.auth = true;
    })
  )
  .handleAction(LoadAggregationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.aggregation = true;
    })
  )
  .handleAction(
    [LoadAuthUserAsync.failure, LoadAggregationsAsync.failure],
    (state, action) =>
      produce(state, (draft) => {
        draft.errors.push(action.payload);
      })
  );

export { AppStatusReducer };
