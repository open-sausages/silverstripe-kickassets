/**
 * @file Reducers for file and folder search
 */

import { SEARCH } from '../constants/actionTypes';
import Immutable from 'immutable';

const initialState = {
  term: null,
  items: Immutable.List(),
  isFetching: false
};

/**
 * @func configReducer
 * @param object initialState
 * @param object action - The dispatched action.
 * @param string action.type - Name of the dispatched action.
 * @param object [action.payload] - Optional data passed with the action.
 * @desc Reducer for the `config` section of state.
 */
export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH.REQUEST_SEARCH:
      return Object.assign({}, state, {
          term: action.payload.term,
          isFetching: true
      });
    case SEARCH.RECEIVE_SEARCH:
      return Object.assign({}, state, {
          isFetching: false,
          items: Immutable.fromJS(action.payload.items)
      });
    default:
      return state;
  }
}
