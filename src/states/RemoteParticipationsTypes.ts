import { firestore } from 'firebase';
import { createAsyncAction } from 'typesafe-actions';

import { AppStatus, Participation } from '../models';

export const LOAD_REMOTE_PARTICIPATIONS_REQUEST =
  'LOAD_REMOTE_PARTICIPATIONS_REQUEST';
export const LOAD_REMOTE_PARTICIPATIONS_SUCCESS =
  'LOAD_REMOTE_PARTICIPATIONS_SUCCESS';
export const LOAD_REMOTE_PARTICIPATIONS_FAILURE =
  'LOAD_REMOTE_PARTICIPATIONS_FAILURE';
export const LOAD_REMOTE_PARTICIPATIONS_CANCEL =
  'LOAD_REMOTE_PARTICIPATIONS_CANCEL';

export const RemoteParticipationsAsync = createAsyncAction(
  LOAD_REMOTE_PARTICIPATIONS_REQUEST,
  LOAD_REMOTE_PARTICIPATIONS_SUCCESS,
  LOAD_REMOTE_PARTICIPATIONS_FAILURE,
  LOAD_REMOTE_PARTICIPATIONS_CANCEL
)<undefined, Participation[], firestore.FirestoreError, undefined>();

export type RemoteParticipationsState = AppStatus & {
  data: Participation[];
};
