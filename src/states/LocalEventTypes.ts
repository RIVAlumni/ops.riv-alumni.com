import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { Event, AppStatus } from '../models';

export const LOAD_EVENT_REQUEST = 'LOAD_EVENT_REQUEST';
export const LOAD_EVENT_SUCCESS = 'LOAD_EVENT_SUCCESS';
export const LOAD_EVENT_FAILURE = 'LOAD_EVENT_FAILURE';
export const LOAD_EVENT_CANCEL = 'LOAD_EVENT_CANCEL';

export const LocalEventsAsync = createAsyncAction(
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_FAILURE,
  LOAD_EVENT_CANCEL
)<undefined, Event[], firestore.FirestoreError, undefined>();

export type LocalEventState = AppStatus & {
  data: Event[];
};
