import { firestore } from 'firebase/app';
import { createAsyncAction } from 'typesafe-actions';

import { Member, AppStatus } from '../models';

export const LOAD_MEMBERSHIP_REQUEST = 'LOAD_MEMBERSHIP_REQUEST';
export const LOAD_MEMBERSHIP_SUCCESS = 'LOAD_MEMBERSHIP_SUCCESS';
export const LOAD_MEMBERSHIP_FAILURE = 'LOAD_MEMBERSHIP_FAILURE';
export const LOAD_MEMBERSHIP_CANCEL = 'LOAD_MEMBERSHIP_CANCEL';

export const LoadMembershipAsync = createAsyncAction(
  LOAD_MEMBERSHIP_REQUEST,
  LOAD_MEMBERSHIP_SUCCESS,
  LOAD_MEMBERSHIP_FAILURE,
  LOAD_MEMBERSHIP_CANCEL
)<undefined, Member, firestore.FirestoreError, undefined>();

export type MembershipState = AppStatus & {
  data: Member | null;
};
