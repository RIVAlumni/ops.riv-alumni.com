import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { AppStatus, Participation } from '../models';

export const LOAD_LOCAL_PARTICIPATIONS_REQUEST =
  'LOAD_LOCAL_PARTICIPATIONS_REQUEST';
export const LOAD_LOCAL_PARTICIPATIONS_SUCCESS =
  'LOAD_LOCAL_PARTICIPATIONS_SUCCESS';
export const LOAD_LOCAL_PARTICIPATIONS_FAILURE =
  'LOAD_LOCAL_PARTICIPATIONS_FAILURE';
export const LOAD_LOCAL_PARTICIPATIONS_CANCEL = 'LOAD_PARTICIPATIONS_CANCEL';

export const LocalParticipationsAsync = createAsyncAction(
  LOAD_LOCAL_PARTICIPATIONS_REQUEST,
  LOAD_LOCAL_PARTICIPATIONS_SUCCESS,
  LOAD_LOCAL_PARTICIPATIONS_FAILURE,
  LOAD_LOCAL_PARTICIPATIONS_CANCEL
)<undefined, Participation[], firestore.FirestoreError, undefined>();

export type LocalParticipationState = AppStatus & {
  data: Participation[];
};
