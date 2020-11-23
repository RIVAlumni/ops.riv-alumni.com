import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import {
  UserAggregation,
  MemberAggregation,
  EventAggregation,
  ParticipationAggregation,
} from '../models';

export const LOAD_AGGREGATIONS_REQUEST = 'LOAD_AGGREGATIONS_REQUEST';
export const LOAD_AGGREGATIONS_SUCCESS = 'LOAD_AGGREGATIONS_SUCCESS';
export const LOAD_AGGREGATIONS_FAILURE = 'LOAD_AGGREGATIONS_FAILURE';
export const LOAD_AGGREGATIONS_CANCEL = 'LOAD_AGGREGATIONS_CANCEL';

export const LoadAggregationsAsync = createAsyncAction(
  LOAD_AGGREGATIONS_REQUEST,
  LOAD_AGGREGATIONS_SUCCESS,
  LOAD_AGGREGATIONS_FAILURE,
  LOAD_AGGREGATIONS_CANCEL
)<undefined, AggregationState, firestore.FirestoreError, undefined>();

export type AggregationState = UserAggregation &
  MemberAggregation &
  EventAggregation &
  ParticipationAggregation;
