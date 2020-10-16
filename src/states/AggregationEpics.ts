import { isOfType } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { tap, filter, ignoreElements } from 'rxjs/operators';

import { EpicType } from '../services';
import {
  RESET_AGGREGATIONS,
  LOAD_AGGREGATIONS,
  SET_AGGREGATION_USER,
  SET_AGGREGATION_MEMBER,
  SET_AGGREGATION_EVENT,
  SET_AGGREGATION_PARTICIPATION,
} from './AggregationTypes';

export const ResetAggregationsEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(RESET_AGGREGATIONS)),
    tap(() => console.log('Reset Aggregations Triggered.')),
    ignoreElements()
  );

export const LoadAggregationsEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(LOAD_AGGREGATIONS)),
    tap(() => console.log('Load Aggregations Triggered.')),
    ignoreElements()
  );

export const SetAggregationUserEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(SET_AGGREGATION_USER)),
    tap(() => console.log('Set Aggregation User Triggered.')),
    ignoreElements()
  );

export const SetAggregationMemberEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(SET_AGGREGATION_MEMBER)),
    tap(() => console.log('Set Aggregation Member Triggered.')),
    ignoreElements()
  );

export const SetAggregationEventEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(SET_AGGREGATION_EVENT)),
    tap(() => console.log('Set Aggregation Event Triggered.')),
    ignoreElements()
  );

export const SetAggregationParticipationEpic: EpicType = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(SET_AGGREGATION_PARTICIPATION)),
    tap(() => console.log('Set Aggregation Participation Triggered.')),
    ignoreElements()
  );

export const AggregationEpics = combineEpics(
  ResetAggregationsEpic,
  LoadAggregationsEpic,
  SetAggregationUserEpic,
  SetAggregationMemberEpic,
  SetAggregationEventEpic,
  SetAggregationParticipationEpic
);
