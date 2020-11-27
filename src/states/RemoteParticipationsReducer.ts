import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import {
  RemoteParticipationsState,
  RemoteParticipationsAsync,
} from './RemoteParticipationsTypes';

const initialState: RemoteParticipationsState = {
  data: [],
  loading: false,
  errors: [],
};

const RemoteParticipationsReducer = createReducer<
  RemoteParticipationsState,
  AppActions
>(initialState)
  .handleAction(RemoteParticipationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(RemoteParticipationsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(RemoteParticipationsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(RemoteParticipationsAsync.cancel, () => initialState);

export { RemoteParticipationsReducer };
