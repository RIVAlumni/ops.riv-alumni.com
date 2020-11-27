import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { Event, AppStatus } from '../models';

export const LOAD_REMOTE_EVENT_REQUEST = 'LOAD_REMOTE_EVENT_REQUEST';
export const LOAD_REMOTE_EVENT_SUCCESS = 'LOAD_REMOTE_EVENT_SUCCESS';
export const LOAD_REMOTE_EVENT_FAILURE = 'LOAD_REMOTE_EVENT_FAILURE';
export const LOAD_REMOTE_EVENT_CANCEL = 'LOAD_REMOTE_EVENT_CANCEL';

export const RemoteEventsAsync = createAsyncAction(
  LOAD_REMOTE_EVENT_REQUEST,
  LOAD_REMOTE_EVENT_SUCCESS,
  LOAD_REMOTE_EVENT_FAILURE,
  LOAD_REMOTE_EVENT_CANCEL
)<undefined, Event[], firestore.FirestoreError, undefined>();

export type RemoteEventState = AppStatus & {
  data: Event[];
};
