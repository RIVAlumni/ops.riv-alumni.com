import { ActionType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { FirebaseService } from '../services';
import {
  AppStatusReducer,
  AuthUserReducer,
  AggregationReducer,
  MembershipReducer,
  EventReducer,
  ParticipationReducer,
  AuthUserEpics,
  AggregationEpics,
  MembershipEpics,
  EventEpics,
  ParticipationEpics,
  LoadAuthUserAsync,
  LoadAggregationsAsync,
  LoadMembershipAsync,
  LoadEventsAsync,
  LoadParticipationsAsync,
} from '../states';

const rootActions = {
  LoadAuthUserAsync,
  LoadAggregationsAsync,
  LoadEventsAsync,
  LoadMembershipAsync,
  LoadParticipationsAsync,
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
  ParticipationEpics
);

export const rootReducer = combineReducers({
  status: AppStatusReducer,
  user: AuthUserReducer,
  aggregation: AggregationReducer,
  member: MembershipReducer,
  events: EventReducer,
  participations: ParticipationReducer,
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
