import { produce } from 'immer';
import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import {
  LocalParticipationState,
  LocalParticipationsAsync,
} from './LocalParticipationTypes';

const initialState: LocalParticipationState = {
  data: [],
  loading: false,
  errors: [],
};

const LocalParticipationReducer = createReducer<
  LocalParticipationState,
  AppActions
>(initialState)
  .handleAction(LocalParticipationsAsync.request, (state, _action) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .handleAction(LocalParticipationsAsync.success, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    })
  )
  .handleAction(LocalParticipationsAsync.failure, (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errors.push(action.payload);
    })
  )
  .handleAction(LocalParticipationsAsync.cancel, () => initialState);

export { LocalParticipationReducer };
