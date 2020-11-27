import { isOfType } from 'typesafe-actions';
import { firestore } from 'firebase/app';
import { combineEpics } from 'redux-observable';

import { of, concat } from 'rxjs';
import { map, catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { EpicType } from '../services';
import { UserAccessLevels } from '../models';
import { RemoteParticipationsAsync } from './RemoteParticipationsTypes';
import { LOAD_AUTH_USER_SUCCESS, LOAD_AUTH_USER_CANCEL } from './AuthUserTypes';

export const RemoteParticipationsRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(LOAD_AUTH_USER_CANCEL)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(
      ({ payload }) =>
        !!payload && payload['Access Level'] >= UserAccessLevels.Editor
    ),
    switchMap(() =>
      concat(
        of(RemoteParticipationsAsync.request()),
        firebase.getParticipationsCol().pipe(
          takeUntil(cancel$),
          map(RemoteParticipationsAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(RemoteParticipationsAsync.failure(err))
          )
        )
      )
    )
  );
};

export const RemoteParticipationsCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(RemoteParticipationsAsync.cancel)
  );

export const RemoteParticipationsEpics = combineEpics(
  RemoteParticipationsRequestEpic,
  RemoteParticipationsCancelEpic
);
