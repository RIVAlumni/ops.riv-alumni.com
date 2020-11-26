import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { MembershipState, LoadMembershipAsync } from './MembershipTypes';

const initialState: MembershipState = {
  data: null,
  loading: false,
  errors: [],
};

const MembershipReducer = createReducer<MembershipState, AppActions>(
  initialState
)
  .handleAction(LoadMembershipAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LoadMembershipAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(LoadMembershipAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LoadMembershipAsync.cancel, () => initialState);

export { MembershipReducer };
