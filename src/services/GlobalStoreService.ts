import { ActionType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { FirebaseService } from '../services';

// Epics
import { AuthUserEpics, MembershipEpics } from '../states';
import { LocalEventEpics, LocalParticipationEpics } from '../states';
import {
  RemoteUsersEpics,
  RemoteMembersEpics,
  RemoteAggregationEpics,
} from '../states';

// Reducers
import { AuthUserReducer, MembershipReducer } from '../states';
import { LocalEventReducer, LocalParticipationReducer } from '../states';
import {
  RemoteUsersReducer,
  RemoteMembersReducer,
  RemoteAggregationReducer,
} from '../states';

// Async Actions
import { AuthUserAsync, MembershipAsync } from '../states';
import { LocalEventsAsync, LocalParticipationsAsync } from '../states';
import {
  RemoteUsersAsync,
  RemoteMembersAsync,
  RemoteAggregationsAsync,
} from '../states';

const rootActions = {
  AuthUserAsync,
  MembershipAsync,
  LocalEventsAsync,
  LocalParticipationsAsync,
  RemoteUsersAsync,
  RemoteMembersAsync,
  RemoteAggregationsAsync,
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
  MembershipEpics,
  LocalEventEpics,
  LocalParticipationEpics,
  RemoteUsersEpics,
  RemoteMembersEpics,
  RemoteAggregationEpics
);

export const rootReducer = combineReducers({
  auth: AuthUserReducer,
  membership: MembershipReducer,
  local: combineReducers({
    events: LocalEventReducer,
    participations: LocalParticipationReducer,
  }),
  remote: combineReducers({
    users: RemoteUsersReducer,
    members: RemoteMembersReducer,
    aggregations: RemoteAggregationReducer,
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
