import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { Member, AppStatus } from '../models';

export const LOAD_REMOTE_MEMBERS_REQUEST = 'LOAD_REMOTE_MEMBERS_REQUEST';
export const LOAD_REMOTE_MEMBERS_SUCCESS = 'LOAD_REMOTE_MEMBERS_SUCCESS';
export const LOAD_REMOTE_MEMBERS_FAILURE = 'LOAD_REMOTE_MEMBERS_FAILURE';
export const LOAD_REMOTE_MEMBERS_CANCEL = 'LOAD_REMOTE_MEMBERS_CANCEL';

export const RemoteMembersAsync = createAsyncAction(
  LOAD_REMOTE_MEMBERS_REQUEST,
  LOAD_REMOTE_MEMBERS_SUCCESS,
  LOAD_REMOTE_MEMBERS_FAILURE,
  LOAD_REMOTE_MEMBERS_CANCEL
)<undefined, Member[], firestore.FirestoreError, undefined>();

export type RemoteMembersState = AppStatus & {
  data: Member[];
};
