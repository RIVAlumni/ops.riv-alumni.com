import { concat, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { firestore } from 'firebase';
import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { EpicType } from '../services';
import { MembershipAsync } from './MembershipTypes';
import { LOAD_AUTH_USER_CANCEL, LOAD_AUTH_USER_SUCCESS } from './AuthUserTypes';

export const MembershipRequestEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(LOAD_AUTH_USER_CANCEL)));

  return action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_SUCCESS)),
    filter(({ payload }) => !!payload && !!payload['Membership ID']),
    switchMap(({ payload }) => {
      if (!payload['Membership ID']) return of(MembershipAsync.cancel());

      return concat(
        of(MembershipAsync.request()),
        firebase.getMemberDoc(payload['Membership ID']).pipe(
          takeUntil(cancel$),
          map(MembershipAsync.success),
          catchError((err: firestore.FirestoreError) =>
            of(MembershipAsync.failure(err))
          )
        )
      );
    })
  );
};

export const MembershipFailureEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AUTH_USER_CANCEL)),
    map(MembershipAsync.cancel)
  );

export const MembershipEpics = combineEpics(MembershipRequestEpic);
