import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import {
  ParticipationState,
  LoadParticipationsAsync,
} from './ParticipationTypes';

const initialState: ParticipationState = [];

const ParticipationReducer = createReducer<ParticipationState, AppActions>(
  initialState
)
  .handleAction(LoadParticipationsAsync.cancel, () => initialState)
  .handleAction(
    LoadParticipationsAsync.success,
    (_state, action) => action.payload
  );

export { ParticipationReducer };
