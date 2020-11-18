import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { Participation } from '../models';

export const LOAD_PARTICIPATIONS_REQUEST = 'LOAD_PARTICIPATIONS_REQUEST';
export const LOAD_PARTICIPATIONS_SUCCESS = 'LOAD_PARTICIPATIONS_SUCCESS';
export const LOAD_PARTICIPATIONS_FAILURE = 'LOAD_PARTICIPATIONS_FAILURE';
export const LOAD_PARTICIPATIONS_CANCEL = 'LOAD_PARTICIPATIONS_CANCEL';

export const LoadParticipationsAsync = createAsyncAction(
  LOAD_PARTICIPATIONS_REQUEST,
  LOAD_PARTICIPATIONS_SUCCESS,
  LOAD_PARTICIPATIONS_FAILURE,
  LOAD_PARTICIPATIONS_CANCEL
)<undefined, Participation[], firestore.FirestoreError, undefined>();

export type ParticipationState = Participation[];
