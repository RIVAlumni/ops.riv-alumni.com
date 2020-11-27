import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import {
  AppStatus,
  UserAggregation,
  MemberAggregation,
  EventAggregation,
  ParticipationAggregation,
} from '../models';

export const LOAD_REMOTE_AGGREGATIONS_REQUEST =
  'LOAD_REMOTE_AGGREGATIONS_REQUEST';
export const LOAD_REMOTE_AGGREGATIONS_SUCCESS =
  'LOAD_REMOTE_AGGREGATIONS_SUCCESS';
export const LOAD_REMOTE_AGGREGATIONS_FAILURE =
  'LOAD_REMOTE_AGGREGATIONS_FAILURE';
export const LOAD_REMOTE_AGGREGATIONS_CANCEL =
  'LOAD_REMOTE_AGGREGATIONS_CANCEL';

export const RemoteAggregationsAsync = createAsyncAction(
  LOAD_REMOTE_AGGREGATIONS_REQUEST,
  LOAD_REMOTE_AGGREGATIONS_SUCCESS,
  LOAD_REMOTE_AGGREGATIONS_FAILURE,
  LOAD_REMOTE_AGGREGATIONS_CANCEL
)<undefined, RemoteAggregationType, firestore.FirestoreError, undefined>();

type RemoteAggregationType = UserAggregation &
  MemberAggregation &
  EventAggregation &
  ParticipationAggregation;

export type RemoteAggregationState = AppStatus & {
  data: UserAggregation &
    MemberAggregation &
    EventAggregation &
    ParticipationAggregation;
};
