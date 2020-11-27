import { of, concat } from 'rxjs';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { firestore } from 'firebase';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { EpicType } from '../services';
import { LocalEventsAsync } from './LocalEventTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const LocalEventRequestEpic: EpicType = (
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
        of(LocalEventsAsync.request()),
        firebase.getEventsCol().pipe(
          takeUntil(cancel$),
          map(LocalEventsAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(LocalEventsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const LocalEventCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(LocalEventsAsync.cancel)
  );

export const LocalEventEpics = combineEpics(
  LocalEventRequestEpic,
  LocalEventCancelEpic
);
