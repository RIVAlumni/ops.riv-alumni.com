import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { AggregationState, LoadAggregationsAsync } from './AggregationTypes';

const initialState: AggregationState = {
  usersCount: 0,
  membersCount: 0,
  eventsCount: 0,
  participationsCount: 0,
};

const AggregationReducer = createReducer<AggregationState, AppActions>(
  initialState
)
  .handleAction(LoadAggregationsAsync.cancel, () => initialState)
  .handleAction(LoadAggregationsAsync.success, (_state, action) => ({
    ...action.payload,
  }));

export { AggregationReducer };
