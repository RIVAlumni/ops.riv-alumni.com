import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import {
  ParticipationState,
  LoadParticipationsAsync,
} from './ParticipationTypes';

const initialState: ParticipationState = {
  data: [],
  loading: false,
  errors: [],
};

const ParticipationReducer = createReducer<ParticipationState, AppActions>(
  initialState
)
  .handleAction(LoadParticipationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LoadParticipationsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(LoadParticipationsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LoadParticipationsAsync.cancel, () => initialState);

export { ParticipationReducer };
