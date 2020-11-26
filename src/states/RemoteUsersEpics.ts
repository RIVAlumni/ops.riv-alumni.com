import { firestore } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of, concat } from 'rxjs';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { EpicType } from '../services';
import { UserAccessLevels } from '../models';
import { LoadRemoteUsersAsync } from './RemoteUsersTypes';
import { LOAD_AUTH_USER_SUCCESS, LOAD_AUTH_USER_CANCEL } from './AuthUserTypes';

export const LoadRemoteUsersRequestEpic: EpicType = (
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
        of(LoadRemoteUsersAsync.request()),
        firebase.getUsersCol().pipe(
          takeUntil(cancel$),
          map(LoadRemoteUsersAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(LoadRemoteUsersAsync.failure(err))
          )
        )
      )
    )
  );
};

export const LoadRemoteUsersCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(LoadRemoteUsersAsync.cancel)
  );

export const RemoteUsersEpics = combineEpics(
  LoadRemoteUsersRequestEpic,
  LoadRemoteUsersCancelEpic
);
