import { produce } from 'immer';

import { AppActions } from '../services';
import {
  RESET_AUTH_USER,
  LOAD_AUTH_USER_REQUEST,
  LOAD_AUTH_USER_SUCCESS,
  LOAD_AUTH_USER_FAILURE,
} from './AuthUserTypes';
import {
  RESET_AGGREGATIONS,
  LOAD_AGGREGATIONS_USER_REQUEST,
  LOAD_AGGREGATIONS_USER_SUCCESS,
  LOAD_AGGREGATIONS_USER_FAILURE,
  LOAD_AGGREGATIONS_MEMBER_REQUEST,
  LOAD_AGGREGATIONS_MEMBER_SUCCESS,
  LOAD_AGGREGATIONS_MEMBER_FAILURE,
  LOAD_AGGREGATIONS_EVENT_REQUEST,
  LOAD_AGGREGATIONS_EVENT_SUCCESS,
  LOAD_AGGREGATIONS_EVENT_FAILURE,
  LOAD_AGGREGATIONS_PARTICIPATION_REQUEST,
  LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS,
  LOAD_AGGREGATIONS_PARTICIPATION_FAILURE,
} from './AggregationTypes';

interface AppStatusState {
  loading: {
    auth_user: boolean;
    aggregation: {
      users: boolean;
      members: boolean;
      events: boolean;
      participations: boolean;
    };
  };
  errors: unknown[];
}

const initialState: AppStatusState = {
  loading: {
    auth_user: false,
    aggregation: {
      users: false,
      members: false,
      events: false,
      participations: false,
    },
  },
  errors: [],
};

const AppStatusReducer = (
  state: AppStatusState = initialState,
  action: AppActions
): AppStatusState =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_AUTH_USER:
        draft.loading.auth_user = false;
        break;
      case LOAD_AUTH_USER_REQUEST:
        draft.loading.auth_user = true;
        break;
      case LOAD_AUTH_USER_SUCCESS:
        draft.loading.auth_user = false;
        break;
      case LOAD_AUTH_USER_FAILURE:
        draft.loading.auth_user = false;
        draft.errors.push(action.error);
        break;
      case RESET_AGGREGATIONS:
        draft.loading.aggregation = initialState.loading.aggregation;
        break;
      case LOAD_AGGREGATIONS_USER_REQUEST:
        draft.loading.aggregation.users = true;
        break;
      case LOAD_AGGREGATIONS_USER_SUCCESS:
        draft.loading.aggregation.users = false;
        break;
      case LOAD_AGGREGATIONS_USER_FAILURE:
        draft.loading.aggregation.users = false;
        draft.errors.push(action.error);
        break;
      case LOAD_AGGREGATIONS_MEMBER_REQUEST:
        draft.loading.aggregation.members = true;
        break;
      case LOAD_AGGREGATIONS_MEMBER_SUCCESS:
        draft.loading.aggregation.members = false;
        break;
      case LOAD_AGGREGATIONS_MEMBER_FAILURE:
        draft.loading.aggregation.members = false;
        draft.errors.push(action.error);
        break;
      case LOAD_AGGREGATIONS_EVENT_REQUEST:
        draft.loading.aggregation.events = true;
        break;
      case LOAD_AGGREGATIONS_EVENT_SUCCESS:
        draft.loading.aggregation.events = false;
        break;
      case LOAD_AGGREGATIONS_EVENT_FAILURE:
        draft.loading.aggregation.events = false;
        draft.errors.push(action.error);
        break;
      case LOAD_AGGREGATIONS_PARTICIPATION_REQUEST:
        draft.loading.aggregation.participations = true;
        break;
      case LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS:
        draft.loading.aggregation.participations = false;
        break;
      case LOAD_AGGREGATIONS_PARTICIPATION_FAILURE:
        draft.loading.aggregation.participations = false;
        draft.errors.push(action.error);
        break;
    }
  });

export { AppStatusReducer };
