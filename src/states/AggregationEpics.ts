import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { combineLatest } from 'rxjs';
import { filter, mergeMap, takeUntil, switchMap } from 'rxjs/operators';

import { EpicType } from '../services';
import {
  RESET_AGGREGATIONS,
  LOAD_AGGREGATIONS,
  SetAggregationUser,
  SetAggregationMember,
  SetAggregationEvent,
  SetAggregationParticipation,
} from './AggregationTypes';

export const LoadAggregationsEpic: EpicType = (
  action$,
  _state$,
  { firebase }
) => {
  const cancel$ = action$.pipe(filter(isOfType(RESET_AGGREGATIONS)));

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

export const AggregationEpics = combineEpics(LoadAggregationsEpic);
