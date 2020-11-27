import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { MembershipState, MembershipAsync } from './MembershipTypes';

const initialState: MembershipState = {
  data: null,
  loading: false,
  errors: [],
};

const MembershipReducer = createReducer<MembershipState, AppActions>(
  initialState
)
  .handleAction(MembershipAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(MembershipAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(MembershipAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(MembershipAsync.cancel, () => initialState);

export { MembershipReducer };
