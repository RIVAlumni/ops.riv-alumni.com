import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { User, AppStatus } from '../models';

export const LOAD_REMOTE_USERS_REQUEST = 'LOAD_REMOTE_USERS_REQUEST';
export const LOAD_REMOTE_USERS_SUCCESS = 'LOAD_REMOTE_USERS_SUCCESS';
export const LOAD_REMOTE_USERS_FAILURE = 'LOAD_REMOTE_USERS_FAILURE';
export const LOAD_REMOTE_USERS_CANCEL = 'LOAD_REMOTE_USERS_CANCEL';

export const LoadRemoteUsersAsync = createAsyncAction(
  LOAD_REMOTE_USERS_REQUEST,
  LOAD_REMOTE_USERS_SUCCESS,
  LOAD_REMOTE_USERS_FAILURE,
  LOAD_REMOTE_USERS_CANCEL
)<undefined, User[], firestore.FirestoreError, undefined>();

export type RemoteUsersState = AppStatus & {
  data: User[];
};
