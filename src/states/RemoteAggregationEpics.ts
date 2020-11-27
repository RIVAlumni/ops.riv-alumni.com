import { firestore } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of, concat, combineLatest } from 'rxjs';
import { map, filter, takeUntil, switchMap, catchError } from 'rxjs/operators';

import { EpicType } from '../services';
import { RemoteAggregationsAsync } from './RemoteAggregationTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const RemoteAggregationsRequestEpic: EpicType = (
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
        of(RemoteAggregationsAsync.request()),
        combineLatest([
          firebase.getUsersAgnDoc(),
          firebase.getMembersAgnDoc(),
          firebase.getEventsAgnDoc(),
          firebase.getParticipationsAgnDoc(),
        ]).pipe(
          takeUntil(cancel$),
          map(([users, members, events, participations]) =>
            RemoteAggregationsAsync.success({
              ...users,
              ...members,
              ...events,
              ...participations,
            })
          ),
          catchError((err: firestore.FirestoreError) =>
            of(RemoteAggregationsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const RemoteAggregationsCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(RemoteAggregationsAsync.cancel)
  );

export const RemoteAggregationEpics = combineEpics(
  RemoteAggregationsRequestEpic,
  RemoteAggregationsCancelEpic
);
