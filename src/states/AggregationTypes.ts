import { firestore } from 'firebase/app';
import {
  UserAggregation,
  MemberAggregation,
  EventAggregation,
  ParticipationAggregation,
} from '../models';

export const RESET_AGGREGATIONS = 'RESET_AGGREGATIONS';

export const LOAD_AGGREGATIONS_USER_REQUEST = 'LOAD_AGGREGATIONS_USER_REQUEST';
export const LOAD_AGGREGATIONS_USER_SUCCESS = 'LOAD_AGGREGATIONS_USER_SUCCESS';
export const LOAD_AGGREGATIONS_USER_FAILURE = 'LOAD_AGGREGATIONS_USER_FAILURE';

export const LOAD_AGGREGATIONS_MEMBER_REQUEST =
  'LOAD_AGGREGATIONS_MEMBER_REQUEST';
export const LOAD_AGGREGATIONS_MEMBER_SUCCESS =
  'LOAD_AGGREGATIONS_MEMBER_SUCCESS';
export const LOAD_AGGREGATIONS_MEMBER_FAILURE =
  'LOAD_AGGREGATIONS_MEMBER_FAILURE';

export const LOAD_AGGREGATIONS_EVENT_REQUEST =
  'LOAD_AGGREGATIONS_EVENT_REQUEST';
export const LOAD_AGGREGATIONS_EVENT_SUCCESS =
  'LOAD_AGGREGATIONS_EVENT_SUCCESS';
export const LOAD_AGGREGATIONS_EVENT_FAILURE =
  'LOAD_AGGREGATIONS_EVENT_FAILURE';

export const LOAD_AGGREGATIONS_PARTICIPATION_REQUEST =
  'LOAD_AGGREGATIONS_PARTICIPATION_REQUEST';
export const LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS =
  'LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS';
export const LOAD_AGGREGATIONS_PARTICIPATION_FAILURE =
  'LOAD_AGGREGATIONS_PARTICIPATION_FAILURE';

// export const RESET_AGGREGATIONS = 'RESET_AGGREGATIONS';
// export const LOAD_AGGREGATIONS = 'LOAD_AGGREGATIONS';

// export const SET_AGGREGATION_USER = 'SET_AGGREGATION_USER';
// export const SET_AGGREGATION_MEMBER = 'SET_AGGREGATION_MEMBER';
// export const SET_AGGREGATION_EVENT = 'SET_AGGREGATION_EVENT';
// export const SET_AGGREGATION_PARTICIPATION = 'SET_AGGREGATION_PARTICIPATION';

export const ResetAggregations = (): ResetAggregationsAction => ({
  type: RESET_AGGREGATIONS,
});

export const LoadAggregationsUserRequest = (): LoadAggregationsUserRequestAction => ({
  type: LOAD_AGGREGATIONS_USER_REQUEST,
});

export const LoadAggregationsUserSuccess = (
  aggregation: UserAggregation
): LoadAggregationsUserSuccessAction => ({
  type: LOAD_AGGREGATIONS_USER_SUCCESS,
  aggregation,
});

export const LoadAggregationsUserFailure = (
  error: firestore.FirestoreError
): LoadAggregationsUserFailureAction => ({
  type: LOAD_AGGREGATIONS_USER_FAILURE,
  error,
});

export const LoadAggregationsMemberRequest = (): LoadAggregationsMemberRequestAction => ({
  type: LOAD_AGGREGATIONS_MEMBER_REQUEST,
});

export const LoadAggregationsMemberSuccess = (
  aggregation: MemberAggregation
): LoadAggregationsMemberSuccessAction => ({
  type: LOAD_AGGREGATIONS_MEMBER_SUCCESS,
  aggregation,
});

export const LoadAggregationsMemberFailure = (
  error: firestore.FirestoreError
): LoadAggregationsMemberFailureAction => ({
  type: LOAD_AGGREGATIONS_MEMBER_FAILURE,
  error,
});

export const LoadAggregationsEventRequest = (): LoadAggregationsEventRequestAction => ({
  type: LOAD_AGGREGATIONS_EVENT_REQUEST,
});

export const LoadAggregationsEventSuccess = (
  aggregation: EventAggregation
): LoadAggregationsEventSuccessAction => ({
  type: LOAD_AGGREGATIONS_EVENT_SUCCESS,
  aggregation,
});

export const LoadAggregationsEventFailure = (
  error: firestore.FirestoreError
): LoadAggregationsEventFailureAction => ({
  type: LOAD_AGGREGATIONS_EVENT_FAILURE,
  error,
});

export const LoadAggregationsParticipationRequest = (): LoadAggregationsParticipationRequestAction => ({
  type: LOAD_AGGREGATIONS_PARTICIPATION_REQUEST,
});

export const LoadAggregationsParticipationSuccess = (
  aggregation: ParticipationAggregation
): LoadAggregationsParticipationSuccessAction => ({
  type: LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS,
  aggregation,
});

export const LoadAggregationsParticipationFailure = (
  error: firestore.FirestoreError
): LoadAggregationsParticipationFailureAction => ({
  type: LOAD_AGGREGATIONS_PARTICIPATION_FAILURE,
  error,
});

export interface ResetAggregationsAction {
  type: typeof RESET_AGGREGATIONS;
}

export interface LoadAggregationsUserRequestAction {
  type: typeof LOAD_AGGREGATIONS_USER_REQUEST;
}

export interface LoadAggregationsUserSuccessAction {
  type: typeof LOAD_AGGREGATIONS_USER_SUCCESS;
  aggregation: UserAggregation;
}

export interface LoadAggregationsUserFailureAction {
  type: typeof LOAD_AGGREGATIONS_USER_FAILURE;
  error: firestore.FirestoreError;
}

export interface LoadAggregationsMemberRequestAction {
  type: typeof LOAD_AGGREGATIONS_MEMBER_REQUEST;
}

export interface LoadAggregationsMemberSuccessAction {
  type: typeof LOAD_AGGREGATIONS_MEMBER_SUCCESS;
  aggregation: MemberAggregation;
}

export interface LoadAggregationsMemberFailureAction {
  type: typeof LOAD_AGGREGATIONS_MEMBER_FAILURE;
  error: firestore.FirestoreError;
}

export interface LoadAggregationsEventRequestAction {
  type: typeof LOAD_AGGREGATIONS_EVENT_REQUEST;
}

export interface LoadAggregationsEventSuccessAction {
  type: typeof LOAD_AGGREGATIONS_EVENT_SUCCESS;
  aggregation: EventAggregation;
}

export interface LoadAggregationsEventFailureAction {
  type: typeof LOAD_AGGREGATIONS_EVENT_FAILURE;
  error: firestore.FirestoreError;
}

export interface LoadAggregationsParticipationRequestAction {
  type: typeof LOAD_AGGREGATIONS_PARTICIPATION_REQUEST;
}

export interface LoadAggregationsParticipationSuccessAction {
  type: typeof LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS;
  aggregation: ParticipationAggregation;
}

export interface LoadAggregationsParticipationFailureAction {
  type: typeof LOAD_AGGREGATIONS_PARTICIPATION_FAILURE;
  error: firestore.FirestoreError;
}

// export const ResetAggregations = (): ResetAggregationsAction => ({
//   type: RESET_AGGREGATIONS,
// });

// export const LoadAggregations = (): LoadAggregationsAction => ({
//   type: LOAD_AGGREGATIONS,
// });

// export const SetAggregationUser = (
//   aggregation: UserAggregation
// ): SetAggregationUserAction => ({
//   type: SET_AGGREGATION_USER,
//   aggregation,
// });

// export const SetAggregationMember = (
//   aggregation: MemberAggregation
// ): SetAggregationMemberAction => ({
//   type: SET_AGGREGATION_MEMBER,
//   aggregation,
// });

// export const SetAggregationEvent = (
//   aggregation: EventAggregation
// ): SetAggregationEventAction => ({
//   type: SET_AGGREGATION_EVENT,
//   aggregation,
// });

// export const SetAggregationParticipation = (
//   aggregation: ParticipationAggregation
// ): SetAggregationParticipationAction => ({
//   type: SET_AGGREGATION_PARTICIPATION,
//   aggregation,
// });

// export interface ResetAggregationsAction {
//   type: typeof RESET_AGGREGATIONS;
// }

// export interface LoadAggregationsAction {
//   type: typeof LOAD_AGGREGATIONS;
// }

// export interface SetAggregationUserAction {
//   type: typeof SET_AGGREGATION_USER;
//   aggregation: UserAggregation;
// }

// export interface SetAggregationMemberAction {
//   type: typeof SET_AGGREGATION_MEMBER;
//   aggregation: MemberAggregation;
// }

// export interface SetAggregationEventAction {
//   type: typeof SET_AGGREGATION_EVENT;
//   aggregation: EventAggregation;
// }

// export interface SetAggregationParticipationAction {
//   type: typeof SET_AGGREGATION_PARTICIPATION;
//   aggregation: ParticipationAggregation;
// }

export type AggregationState = UserAggregation &
  MemberAggregation &
  EventAggregation &
  ParticipationAggregation;

export type AggregationActionTypes =
  | ResetAggregationsAction
  | LoadAggregationsUserRequestAction
  | LoadAggregationsUserSuccessAction
  | LoadAggregationsUserFailureAction
  | LoadAggregationsMemberRequestAction
  | LoadAggregationsMemberSuccessAction
  | LoadAggregationsMemberFailureAction
  | LoadAggregationsEventRequestAction
  | LoadAggregationsEventSuccessAction
  | LoadAggregationsEventFailureAction
  | LoadAggregationsParticipationRequestAction
  | LoadAggregationsParticipationSuccessAction
  | LoadAggregationsParticipationFailureAction;

// export type AggregationActionTypes =
//   | ResetAggregationsAction
//   | LoadAggregationsAction
//   | SetAggregationUserAction
//   | SetAggregationMemberAction
//   | SetAggregationEventAction
//   | SetAggregationParticipationAction;
