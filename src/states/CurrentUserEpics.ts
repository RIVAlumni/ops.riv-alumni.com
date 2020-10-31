import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of } from 'rxjs';
import { authState } from 'rxfire/auth';
import { map, filter, mergeMap, switchMap } from 'rxjs/operators';

import { EpicType } from '../services';
import { ResetAggregations, LoadAggregations } from './AggregationTypes';
import {
  RESET_CURRENT_USER,
  LOAD_CURRENT_USER,
  SET_CURRENT_USER,
  ResetCurrentUser,
  SetCurrentUser,
} from './CurrentUserTypes';

export const CurrentUserResetEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(RESET_CURRENT_USER)),
    mergeMap(() => [ResetAggregations()])
  );

export const CurrentUserLoadEpic: EpicType = (action$, _state$, { firebase }) =>
  action$.pipe(
    filter(isOfType(LOAD_CURRENT_USER)),
    switchMap(() => authState(firebase.auth())),
    switchMap((user) => (!user ? of(null) : firebase.getUserDoc(user.uid))),
    map((user) => (!user ? ResetCurrentUser() : SetCurrentUser(user)))
  );

export const CurrentUserSetEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(SET_CURRENT_USER)),
    mergeMap(({ user }) =>
      user['Access Level'] >= 2 ? [LoadAggregations()] : []
    )
  );

export const CurrentUserEpics = combineEpics(
  CurrentUserResetEpic,
  CurrentUserLoadEpic,
  CurrentUserSetEpic
);
