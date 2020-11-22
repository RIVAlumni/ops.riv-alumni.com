import { of, concat } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { firestore } from 'firebase';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { EpicType } from '../services';
import { Participation } from '../models';
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
    switchMap(({ payload }) =>
      concat(
        of(LoadParticipationsAsync.request()),
        collectionData<Participation>(
          firebase
            .getParticipationsCol()
            .where('Membership ID', '==', payload['Membership ID'])
            .limit(10)
        ).pipe(
          takeUntil(cancel$),
          map(LoadParticipationsAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(LoadParticipationsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const ParticipationEpics = combineEpics(LoadParticipationsRequestEpic);
