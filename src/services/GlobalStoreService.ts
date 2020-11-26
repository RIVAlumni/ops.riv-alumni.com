import { ActionType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { FirebaseService } from '../services';
import {
  AuthUserReducer,
  AggregationReducer,
  MembershipReducer,
  EventReducer,
  ParticipationReducer,
  RemoteUsersReducer,
  AuthUserEpics,
  AggregationEpics,
  MembershipEpics,
  EventEpics,
  ParticipationEpics,
  RemoteUsersEpics,
  LoadAuthUserAsync,
  LoadAggregationsAsync,
  LoadMembershipAsync,
  LoadEventsAsync,
  LoadParticipationsAsync,
  LoadRemoteUsersAsync,
} from '../states';

const rootActions = {
  LoadAuthUserAsync,
  LoadAggregationsAsync,
  LoadEventsAsync,
  LoadMembershipAsync,
  LoadParticipationsAsync,
  LoadRemoteUsersAsync,
};

const rootServices = {
  firebase: FirebaseService.getInstance(),
};

const epicMiddleware = createEpicMiddleware<
  AppActions,
  AppActions,
  AppState,
  typeof rootServices
>({
  dependencies: rootServices,
});

export const rootEpic: EpicType = combineEpics(
  AuthUserEpics,
  AggregationEpics,
  MembershipEpics,
  EventEpics,
  ParticipationEpics,
  RemoteUsersEpics
);

export const rootReducer = combineReducers({
  auth: AuthUserReducer,
  membership: MembershipReducer,
  local: combineReducers({
    events: EventReducer,
    participations: ParticipationReducer,
  }),
  remote: combineReducers({
    users: RemoteUsersReducer,
    aggregations: AggregationReducer,
  }),
});

export const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export type EpicType = Epic<
  AppActions,
  AppActions,
  AppState,
  typeof rootServices
>;

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = ActionType<typeof rootActions>;
