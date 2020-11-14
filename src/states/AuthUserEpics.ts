import { auth } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of } from 'rxjs';
import { authState } from 'rxfire/auth';
import {
  tap,
  map,
  filter,
  mergeMap,
  switchMap,
  catchError,
  ignoreElements,
} from 'rxjs/operators';

import { EpicType } from '../services';
import { LoadAggregationsAsync } from './AggregationTypes';
import {
  LOAD_AUTH_USER_CANCEL,
  LOAD_AUTH_USER_REQUEST,
  LOAD_AUTH_USER_SUCCESS,
  LOAD_AUTH_USER_FAILURE,
  LoadAuthUserAsync,
} from './AuthUserTypes';

export const LoadAuthUserCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    mergeMap(() => [LoadAggregationsAsync.cancel()])
  );

export const LoadAuthUserRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_REQUEST)),
    switchMap(() => authState(firebase.auth())),
    switchMap((user) => (!user ? of(null) : firebase.getUserDoc(user.uid))),
    map((user) =>
      !user ? LoadAuthUserAsync.cancel() : LoadAuthUserAsync.success(user)
    ),
    catchError((err: auth.Error) => of(LoadAuthUserAsync.failure(err)))
  );

export const LoadAuthUserSuccessEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    map((user) => user.payload),
    tap((user) => {
      console.groupCollapsed('Successful Account Login');
      console.info('User ID: ' + user['User ID']);
      console.info('Email: ' + user['Email']);
      console.info('Display Name: ' + user['Display Name']);
      console.info('Membership ID: ' + user['Membership ID']);
      console.info('Access Level: ' + user['Access Level']);
      console.groupEnd();
    }),
    ignoreElements()
  );

export const LoadAuthUserFailureEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_FAILURE)),
    tap(({ payload }) => console.error(`Error Occurred: ${payload.message}`)),
    ignoreElements()
  );

export const AuthUserEpics = combineEpics(
  LoadAuthUserCancelEpic,
  LoadAuthUserRequestEpic,
  LoadAuthUserSuccessEpic,
  LoadAuthUserFailureEpic
);
