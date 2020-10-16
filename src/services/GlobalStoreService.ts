import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import {
  AggregationActionTypes,
  CurrentUserActionTypes,
  AggregationReducer,
  CurrentUserReducer,
  AggregationEpics,
  CurrentUserEpics,
} from '../states';

import { FirebaseService } from '../services';

const epicServices = {
  firebase: FirebaseService.getInstance(),
};

const epicMiddleware = createEpicMiddleware<
  AppActions,
  AppActions,
  AppState,
  typeof epicServices
>({
  dependencies: epicServices,
});

export const rootEpic: EpicType = combineEpics(
  AggregationEpics,
  CurrentUserEpics
);

export const rootReducer = combineReducers({
  user: CurrentUserReducer,
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
  typeof epicServices
>;

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = AggregationActionTypes | CurrentUserActionTypes;
