import { of, concat } from 'rxjs';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { firestore } from 'firebase';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { EpicType } from '../services';
import { LoadParticipationsAsync } from './ParticipationTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const LoadParticipationsRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(LOAD_AUTH_USER_CANCEL)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ payload }) => !!payload && !!payload['Membership ID']),
    switchMap(({ payload }) => {
      const ref = firebase
        .database()
        .collection('participations')
        .where('Membership ID', '==', payload['Membership ID'])
        .limit(10);

      return concat(
        of(LoadParticipationsAsync.request()),
        firebase.getParticipationsCol(ref).pipe(
          takeUntil(cancel$),
          map(LoadParticipationsAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(LoadParticipationsAsync.failure(err))
          )
        )
      );
    })
  );
};

export const LoadParticipationsCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(LoadParticipationsAsync.cancel)
  );

export const ParticipationEpics = combineEpics(
  LoadParticipationsRequestEpic,
  LoadParticipationsCancelEpic
);
