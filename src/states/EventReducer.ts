import { createReducer } from 'typesafe-actions';

import { AppActions } from '../services';
import { EventState, LoadEventsAsync } from './EventTypes';

const initialState: EventState = [];

const EventReducer = createReducer<EventState, AppActions>(initialState)
  .handleAction(LoadEventsAsync.cancel, () => initialState)
  .handleAction(LoadEventsAsync.success, (_state, action) => action.payload);

export { EventReducer };
