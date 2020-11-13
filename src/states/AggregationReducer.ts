import {
  RESET_AGGREGATIONS,
  LOAD_AGGREGATIONS_USER_SUCCESS,
  LOAD_AGGREGATIONS_MEMBER_SUCCESS,
  LOAD_AGGREGATIONS_EVENT_SUCCESS,
  LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS,
  AggregationState,
  AggregationActionTypes,
} from './AggregationTypes';

const initialState: AggregationState = {
  usersCount: 0,
  membersCount: 0,
  eventsCount: 0,
  participationsCount: 0,
};

const AggregationReducer = (
  state: AggregationState = initialState,
  action: AggregationActionTypes
): AggregationState => {
  switch (action.type) {
    case RESET_AGGREGATIONS:
      return initialState;
    case LOAD_AGGREGATIONS_USER_SUCCESS:
      return { ...state, ...action.aggregation };
    case LOAD_AGGREGATIONS_MEMBER_SUCCESS:
      return { ...state, ...action.aggregation };
    case LOAD_AGGREGATIONS_EVENT_SUCCESS:
      return { ...state, ...action.aggregation };
    case LOAD_AGGREGATIONS_PARTICIPATION_SUCCESS:
      return { ...state, ...action.aggregation };
    default:
      return state;
  }
};

export { AggregationReducer };
