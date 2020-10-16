import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of } from 'rxjs';
import { authState } from 'rxfire/auth';
import { filter, ignoreElements, map, switchMap, tap } from 'rxjs/operators';

import {
  CURRENT_USER_RESET,
  CURRENT_USER_LOAD,
  CURRENT_USER_SET,
  CurrentUserReset,
  CurrentUserSet,
} from './CurrentUserTypes';

import { EpicType } from '../services';

export const CurrentUserResetEpic: EpicType = (action$, _state$) =>
  action$.pipe(filter(isOfType(CURRENT_USER_RESET)), ignoreElements());

export const CurrentUserLoadEpic: EpicType = (action$, _state$, { firebase }) =>
  action$.pipe(
    filter(isOfType(CURRENT_USER_LOAD)),
    switchMap(() => authState(firebase.auth())),
    switchMap((user) => (!user ? of(null) : firebase.getUserDoc(user.uid))),
    map((user) => (!user ? CurrentUserReset() : CurrentUserSet(user)))
  );

export const CurrentUserSetEpic: EpicType = (action$, _state$, { firebase }) =>
  action$.pipe(
    filter(isOfType(CURRENT_USER_SET)),
    tap(() => console.log('Current User Set fired.')),
    tap(() => firebase.sayHello()),
    ignoreElements()
  );

export const CurrentUserEpics = combineEpics(
  CurrentUserResetEpic,
  CurrentUserLoadEpic,
  CurrentUserSetEpic
);
