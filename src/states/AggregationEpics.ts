import { firestore } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of } from 'rxjs';
import { map, filter, takeUntil, switchMap, catchError } from 'rxjs/operators';

import { EpicType } from '../services';
import { RESET_AUTH_USER, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';
import {
  LoadAggregationsUserSuccess,
  LoadAggregationsUserFailure,
  LoadAggregationsMemberSuccess,
  LoadAggregationsMemberFailure,
  LoadAggregationsEventSuccess,
  LoadAggregationsEventFailure,
  LoadAggregationsParticipationSuccess,
  LoadAggregationsParticipationFailure,
} from './AggregationTypes';

export const LoadAggregationsUserRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(RESET_AUTH_USER)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ user }) => user['Access Level'] >= 2),
    switchMap(() => firebase.getUsersAgnDoc().pipe(takeUntil(cancel$))),
    map(LoadAggregationsUserSuccess),
    catchError((err: firestore.FirestoreError) =>
      of(LoadAggregationsUserFailure(err))
    )
  );
};

export const LoadAggregationsMemberRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(RESET_AUTH_USER)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ user }) => user['Access Level'] >= 2),
    switchMap(() => firebase.getMembersAgnDoc().pipe(takeUntil(cancel$))),
    map(LoadAggregationsMemberSuccess),
    catchError((err: firestore.FirestoreError) =>
      of(LoadAggregationsMemberFailure(err))
    )
  );
};

export const LoadAggregationsEventRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(RESET_AUTH_USER)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ user }) => user['Access Level'] >= 2),
    switchMap(() => firebase.getEventsAgnDoc().pipe(takeUntil(cancel$))),
    map(LoadAggregationsEventSuccess),
    catchError((err: firestore.FirestoreError) =>
      of(LoadAggregationsEventFailure(err))
    )
  );
};

export const LoadAggregationsParticipationRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(RESET_AUTH_USER)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ user }) => user['Access Level'] >= 2),
    switchMap(() =>
      firebase.getParticipationsAgnDoc().pipe(takeUntil(cancel$))
    ),
    map(LoadAggregationsParticipationSuccess),
    catchError((err: firestore.FirestoreError) =>
      of(LoadAggregationsParticipationFailure(err))
    )
  );
};

export const AggregationEpics = combineEpics(
  LoadAggregationsUserRequestEpic,
  LoadAggregationsMemberRequestEpic,
  LoadAggregationsEventRequestEpic,
  LoadAggregationsParticipationRequestEpic
);
