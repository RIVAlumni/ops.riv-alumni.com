import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { AppStatus, Participation } from '../models';

export const LOAD_PARTICIPATIONS_REQUEST = 'LOAD_PARTICIPATIONS_REQUEST';
export const LOAD_PARTICIPATIONS_SUCCESS = 'LOAD_PARTICIPATIONS_SUCCESS';
export const LOAD_PARTICIPATIONS_FAILURE = 'LOAD_PARTICIPATIONS_FAILURE';
export const LOAD_PARTICIPATIONS_CANCEL = 'LOAD_PARTICIPATIONS_CANCEL';

export const LocalParticipationsAsync = createAsyncAction(
  LOAD_PARTICIPATIONS_REQUEST,
  LOAD_PARTICIPATIONS_SUCCESS,
  LOAD_PARTICIPATIONS_FAILURE,
  LOAD_PARTICIPATIONS_CANCEL
)<undefined, Participation[], firestore.FirestoreError, undefined>();

export type LocalParticipationState = AppStatus & {
  data: Participation[];
};
