import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of } from 'rxjs';
import { authState } from 'rxfire/auth';
import { tap, map, filter, mergeMap, switchMap } from 'rxjs/operators';

import { EpicType } from '../services';
import { ResetAggregations, LoadAggregations } from './AggregationTypes';
import {
  RESET_CURRENT_USER,
  LOAD_CURRENT_USER,
  SET_CURRENT_USER,
  ResetCurrentUser,
  SetCurrentUser,
} from './CurrentUserTypes';

export const ResetCurrentUserEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(RESET_CURRENT_USER)),
    tap(() => console.info('[Sign Out] Resetting User...')),
    mergeMap(() => [ResetAggregations()])
  );

export const LoadCurrentUserEpic: EpicType = (action$, _state$, { firebase }) =>
  action$.pipe(
    filter(isOfType(LOAD_CURRENT_USER)),
    switchMap(() => authState(firebase.auth())),
    switchMap((user) => (!user ? of(null) : firebase.getUserDoc(user.uid))),
    map((user) => (!user ? ResetCurrentUser() : SetCurrentUser(user)))
  );

export const SetCurrentUserEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(SET_CURRENT_USER)),
    tap(({ user }) => {
      console.groupCollapsed('Successful Account Login');
      console.info('User ID: ' + user['User ID']);
      console.info('Email: ' + user['Email']);
      console.info('Display Name: ' + user['Display Name']);
      console.info('Membership ID: ' + user['Membership ID']);
      console.info('Access Level: ' + user['Access Level']);
      console.groupEnd();
    }),
    mergeMap(({ user }) =>
      user['Access Level'] >= 2 ? [LoadAggregations()] : []
    )
  );

export const CurrentUserEpics = combineEpics(
  ResetCurrentUserEpic,
  LoadCurrentUserEpic,
  SetCurrentUserEpic
);
