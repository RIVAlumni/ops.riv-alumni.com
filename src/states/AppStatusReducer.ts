import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { LoadEventsAsync } from './EventTypes';
import { LoadAuthUserAsync } from './AuthUserTypes';
import { LoadMembershipAsync } from './MembershipTypes';
import { LoadAggregationsAsync } from './AggregationTypes';
import { LoadParticipationsAsync } from './ParticipationTypes';

interface AppStatusState {
  loading: {
    auth: boolean;
    events: boolean;
    member: boolean;
    aggregation: boolean;
    participation: boolean;
  };
  errors: unknown[];
}

const initialState: AppStatusState = {
  loading: {
    auth: false,
    events: false,
    member: false,
    aggregation: false,
    participation: false,
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
    [LoadEventsAsync.cancel, LoadEventsAsync.success],
    (state, _action) =>
      produce(state, (draft) => {
        draft.loading.events = false;
      })
  )
  .handleAction(
    [LoadMembershipAsync.cancel, LoadMembershipAsync.success],
    (state, _action) =>
      produce(state, (draft) => {
        draft.loading.member = false;
      })
  )
  .handleAction(
    [LoadAggregationsAsync.cancel, LoadAggregationsAsync.success],
    (state, _action) =>
      produce(state, (draft) => {
        draft.loading.aggregation = false;
      })
  )
  .handleAction(
    [LoadParticipationsAsync.cancel, LoadParticipationsAsync.success],
    (state, _action) =>
      produce(state, (draft) => {
        draft.loading.participation = false;
      })
  )
  .handleAction(LoadAuthUserAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.auth = true;
    })
  )
  .handleAction(LoadEventsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.events = true;
    })
  )
  .handleAction(LoadMembershipAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.member = true;
    })
  )
  .handleAction(LoadAggregationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.aggregation = true;
    })
  )
  .handleAction(LoadParticipationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading.participation = true;
    })
  )
  .handleAction(
    [
      LoadAuthUserAsync.failure,
      LoadEventsAsync.failure,
      LoadMembershipAsync.failure,
      LoadAggregationsAsync.failure,
      LoadParticipationsAsync.failure,
    ],
    (state, action) =>
      produce(state, (draft) => {
        draft.errors.push(action.payload);
      })
  );

export { AppStatusReducer };
