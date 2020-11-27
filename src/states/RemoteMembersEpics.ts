import { firestore } from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { of, concat } from 'rxjs';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { EpicType } from '../services';
import { UserAccessLevels } from '../models';
import { RemoteMembersAsync } from './RemoteMembersTypes';
import { LOAD_AUTH_USER_SUCCESS, LOAD_AUTH_USER_CANCEL } from './AuthUserTypes';

export const RemoteMembersRequestEpic: EpicType = (
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
        of(RemoteMembersAsync.request()),
        firebase.getMembersCol().pipe(
          takeUntil(cancel$),
          map(RemoteMembersAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(RemoteMembersAsync.failure(err))
          )
        )
      )
    )
  );
};

export const RemoteMembersCancelEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(RemoteMembersAsync.cancel)
  );

export const RemoteMembersEpics = combineEpics(
  RemoteMembersRequestEpic,
  RemoteMembersCancelEpic
);
