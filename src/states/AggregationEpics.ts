import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { combineLatest } from 'rxjs';
import {
  tap,
  filter,
  mergeMap,
  takeUntil,
  switchMap,
  ignoreElements,
} from 'rxjs/operators';

import { EpicType } from '../services';
import { RESET_CURRENT_USER } from './CurrentUserTypes';
import {
  RESET_AGGREGATIONS,
  LOAD_AGGREGATIONS,
  SetAggregationUser,
  SetAggregationMember,
  SetAggregationEvent,
  SetAggregationParticipation,
} from './AggregationTypes';

export const ResetAggregationsEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(RESET_AGGREGATIONS)),
    tap(() => console.log('[Sign Out] Resetting Aggregations...')),
    ignoreElements()
  );

export const LoadAggregationsEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(RESET_CURRENT_USER)));

  return action$.pipe(
    filter(isOfType(LOAD_AGGREGATIONS)),
    switchMap(() =>
      combineLatest([
        firebase.getUsersAgnDoc(),
        firebase.getMembersAgnDoc(),
        firebase.getEventsAgnDoc(),
        firebase.getParticipationsAgnDoc(),
      ]).pipe(takeUntil(cancel$))
    ),
    mergeMap(([users, members, events, participations]) => [
      SetAggregationUser(users),
      SetAggregationMember(members),
      SetAggregationEvent(events),
      SetAggregationParticipation(participations),
    ])
  );
};

export const AggregationEpics = combineEpics(
  ResetAggregationsEpic,
  LoadAggregationsEpic
);
