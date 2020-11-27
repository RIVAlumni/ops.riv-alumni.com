import { of, concat } from 'rxjs';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { firestore } from 'firebase';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { EpicType } from '../services';
import { RemoteEventsAsync } from './RemoteEventTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const RemoteEventRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(LOAD_AUTH_USER_CANCEL)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ payload }) => !!payload && !!payload['Membership ID']),
    switchMap(() =>
      concat(
        of(RemoteEventsAsync.request()),
        firebase.getEventsCol().pipe(
          takeUntil(cancel$),
          map(RemoteEventsAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(RemoteEventsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const RemoteEventCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(RemoteEventsAsync.cancel)
  );

export const RemoteEventEpics = combineEpics(
  RemoteEventRequestEpic,
  RemoteEventCancelEpic
);
