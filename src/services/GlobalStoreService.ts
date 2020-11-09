import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import {
  AggregationActionTypes,
  AuthUserActionTypes,
  AggregationReducer,
  AuthUserReducer,
  AuthUserStatusReducer,
  AggregationEpics,
  AuthUserEpics,
} from '../states';

import { FirebaseService } from '../services';

export const AppServices = {
  firebase: FirebaseService.getInstance(),
};

const epicMiddleware = createEpicMiddleware<
  AppActions,
  AppActions,
  AppState,
  typeof AppServices
>({
  dependencies: AppServices,
});

export const rootEpic: EpicType = combineEpics(AggregationEpics, AuthUserEpics);

export const rootReducer = combineReducers({
  user: AuthUserReducer,
  user_status: AuthUserStatusReducer,
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
  typeof AppServices
>;

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = AggregationActionTypes | AuthUserActionTypes;
