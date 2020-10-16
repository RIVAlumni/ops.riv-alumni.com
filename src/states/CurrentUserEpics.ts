import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';

import {
  CURRENT_USER_RESET,
  CURRENT_USER_LOAD,
  CURRENT_USER_SET,
} from './CurrentUserTypes';

import { EpicType } from '../services';

export const CurrentUserResetEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) =>
  action$.pipe(
    filter(isOfType(CURRENT_USER_RESET)),
    tap(() => console.log('Current User Reset fired.')),
    tap(() => firebase.sayHello()),
    ignoreElements()
  );

export const CurrentUserLoadEpic: EpicType = (action$, _state$, { firebase }) =>
  action$.pipe(
    filter(isOfType(CURRENT_USER_LOAD)),
    tap(() => console.log('Current User Load fired.')),
    tap(() => firebase.sayHello()),
    ignoreElements()
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
