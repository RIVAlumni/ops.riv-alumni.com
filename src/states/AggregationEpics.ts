import { firestore } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of, concat, combineLatest } from 'rxjs';
import { map, filter, takeUntil, switchMap, catchError } from 'rxjs/operators';

import { EpicType } from '../services';
import { LoadAggregationsAsync } from './AggregationTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const LoadAggregationsRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(LOAD_AUTH_USER_CANCEL)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ payload }) => payload['Access Level'] >= 2),
    switchMap(() =>
      concat(
        of(LoadAggregationsAsync.request()),
        combineLatest([
          firebase.getUsersAgnDoc(),
          firebase.getMembersAgnDoc(),
          firebase.getEventsAgnDoc(),
          firebase.getParticipationsAgnDoc(),
        ]).pipe(
          takeUntil(cancel$),
          map(([users, members, events, participations]) =>
            LoadAggregationsAsync.success({
              ...users,
              ...members,
              ...events,
              ...participations,
            })
          ),
          catchError((err: firestore.FirestoreError) =>
            of(LoadAggregationsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const LoadAggregationsCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(LoadAggregationsAsync.cancel)
  );

export const AggregationEpics = combineEpics(
  LoadAggregationsRequestEpic,
  LoadAggregationsCancelEpic
);
