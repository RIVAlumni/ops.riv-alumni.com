import { of, concat } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { firestore } from 'firebase';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { Event } from '../models';
import { EpicType } from '../services';
import { LoadEventsAsync } from './EventTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const LoadEventRequestEpic: EpicType = (
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
        of(LoadEventsAsync.request()),
        collectionData<Event>(firebase.getEventsCol().limit(10)).pipe(
          takeUntil(cancel$),
          map(LoadEventsAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(LoadEventsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const EventEpics = combineEpics(LoadEventRequestEpic);
