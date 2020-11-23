import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { MembershipState, LoadMembershipAsync } from './MembershipTypes';

const initialState: MembershipState = null;

const MembershipReducer = createReducer<MembershipState, AppActions>(
  initialState
)
  .handleAction(LoadMembershipAsync.cancel, () => initialState)
  .handleAction(
    LoadMembershipAsync.success,
    (_state, action) => action.payload
  );

export { MembershipReducer };
