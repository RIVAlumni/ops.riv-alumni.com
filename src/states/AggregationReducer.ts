import {
  RESET_AGGREGATIONS,
  SET_AGGREGATION_USER,
  SET_AGGREGATION_MEMBER,
  SET_AGGREGATION_EVENT,
  SET_AGGREGATION_PARTICIPATION,
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
    case SET_AGGREGATION_USER:
      return { ...state, ...action.aggregation };
    case SET_AGGREGATION_MEMBER:
      return { ...state, ...action.aggregation };
    case SET_AGGREGATION_EVENT:
      return { ...state, ...action.aggregation };
    case SET_AGGREGATION_PARTICIPATION:
      return { ...state, ...action.aggregation };
    default:
      return state;
  }
};

export { AggregationReducer };
