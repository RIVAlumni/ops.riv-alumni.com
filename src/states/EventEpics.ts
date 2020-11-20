import { of } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { firestore } from 'firebase';
import { combineEpics } from 'redux-observable';
import { collectionData } from 'rxfire/firestore';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

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
      collectionData<Event>(firebase.getEventsCol().limit(10)).pipe(
        takeUntil(cancel$),
        map(LoadEventsAsync.success),
        catchError((err: firestore.FirestoreError) =>
          of(LoadEventsAsync.failure(err))
        )
      )
    )
  );
};

export const EventEpics = combineEpics(LoadEventRequestEpic);
