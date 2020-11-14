import { ActionType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { FirebaseService } from '../services';
import {
  AggregationReducer,
  AuthUserReducer,
  AppStatusReducer,
  AggregationEpics,
  AuthUserEpics,
  LoadAuthUserAsync,
  LoadAggregationsAsync,
} from '../states';

const rootActions = {
  LoadAuthUserAsync,
  LoadAggregationsAsync,
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

export const rootEpic: EpicType = combineEpics(AggregationEpics, AuthUserEpics);

export const rootReducer = combineReducers({
  user: AuthUserReducer,
  status: AppStatusReducer,
  aggregation: AggregationReducer,
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
