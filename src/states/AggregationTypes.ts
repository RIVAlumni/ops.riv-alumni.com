import {
  UserAggregation,
  MemberAggregation,
  EventAggregation,
  ParticipationAggregation,
} from '../models';

export const RESET_AGGREGATIONS = 'RESET_AGGREGATIONS';
export const LOAD_AGGREGATIONS = 'LOAD_AGGREGATIONS';

export const SET_AGGREGATION_USER = 'SET_AGGREGATION_USER';
export const SET_AGGREGATION_MEMBER = 'SET_AGGREGATION_MEMBER';
export const SET_AGGREGATION_EVENT = 'SET_AGGREGATION_EVENT';
export const SET_AGGREGATION_PARTICIPATION = 'SET_AGGREGATION_PARTICIPATION';

export const ResetAggregations = (): ResetAggregationsAction => ({
  type: RESET_AGGREGATIONS,
});

export const LoadAggregations = (): LoadAggregationsAction => ({
  type: LOAD_AGGREGATIONS,
});

export const SetAggregationUser = (
  aggregation: UserAggregation
): SetAggregationUserAction => ({
  type: SET_AGGREGATION_USER,
  aggregation,
});

export const SetAggregationMember = (
  aggregation: MemberAggregation
): SetAggregationMemberAction => ({
  type: SET_AGGREGATION_MEMBER,
  aggregation,
});

export const SetAggregationEvent = (
  aggregation: EventAggregation
): SetAggregationEventAction => ({
  type: SET_AGGREGATION_EVENT,
  aggregation,
});

export const SetAggregationParticipation = (
  aggregation: ParticipationAggregation
): SetAggregationParticipationAction => ({
  type: SET_AGGREGATION_PARTICIPATION,
  aggregation,
});

export interface ResetAggregationsAction {
  type: typeof RESET_AGGREGATIONS;
}

export interface LoadAggregationsAction {
  type: typeof LOAD_AGGREGATIONS;
}

export interface SetAggregationUserAction {
  type: typeof SET_AGGREGATION_USER;
  aggregation: UserAggregation;
}

export interface SetAggregationMemberAction {
  type: typeof SET_AGGREGATION_MEMBER;
  aggregation: MemberAggregation;
}

export interface SetAggregationEventAction {
  type: typeof SET_AGGREGATION_EVENT;
  aggregation: EventAggregation;
}

export interface SetAggregationParticipationAction {
  type: typeof SET_AGGREGATION_PARTICIPATION;
  aggregation: ParticipationAggregation;
}

export type AggregationState = UserAggregation &
  MemberAggregation &
  EventAggregation &
  ParticipationAggregation;

export type AggregationActionTypes =
  | ResetAggregationsAction
  | LoadAggregationsAction
  | SetAggregationUserAction
  | SetAggregationMemberAction
  | SetAggregationEventAction
  | SetAggregationParticipationAction;
