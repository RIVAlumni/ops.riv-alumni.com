import { auth } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of } from 'rxjs';
import { authState } from 'rxfire/auth';
import {
  tap,
  map,
  filter,
  switchMap,
  catchError,
  ignoreElements,
} from 'rxjs/operators';

import { EpicType } from '../services';
import {
  LOAD_AUTH_USER_REQUEST,
  LOAD_AUTH_USER_SUCCESS,
  LOAD_AUTH_USER_FAILURE,
  AuthUserAsync,
} from './AuthUserTypes';

export const AuthUserRequestEpic: EpicType = (action$, _state$, { firebase }) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_REQUEST)),
    switchMap(() => authState(firebase.auth())),
    switchMap((user) =>
      !user
        ? of(null).pipe(map(AuthUserAsync.cancel))
        : firebase.getUserDoc(user.uid).pipe(
            map(AuthUserAsync.success),
            catchError((err: auth.Error) => of(AuthUserAsync.failure(err)))
          )
    )
  );

export const AuthUserSuccessEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    tap(({ payload }) => {
      console.groupCollapsed('Successful Account Login');
      console.info('User ID: ' + payload['User ID']);
      console.info('Email Address: ' + payload['Email']);
      console.info('Display Name: ' + payload['Display Name']);
      console.info('Membership ID: ' + payload['Membership ID']);
      console.info('Access Level: ' + payload['Access Level']);
      console.groupEnd();
    }),
    ignoreElements()
  );

export const AuthUserFailureEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_FAILURE)),
    tap(({ payload }) => console.error(`Error Occurred: ${payload.message}`)),
    ignoreElements()
  );

export const AuthUserEpics = combineEpics(
  AuthUserRequestEpic,
  AuthUserSuccessEpic,
  AuthUserFailureEpic
);
