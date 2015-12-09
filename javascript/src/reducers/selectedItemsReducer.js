/**
 * @file Reducers for application's selected items.
 */

import { SELECTED_ITEMS } from '../constants/actionTypes';

const initialState = {
	data: [],
	multi: false
};

/**
 * @func selectedItemsReducer
 * @param object initialState
 * @param object action - The dispatched action.
 * @param string action.type - Name of the dispatched action.
 * @param object [action.payload] - Optional data passed with the action.
 * @desc Reducer for the `selectedItems` section of state.
 */
export default function selectedItemsReducer(state = initialState, action) {
	switch (action.type) {
		case SELECTED_ITEMS.ACTIVATE_MULTISELECT:
			return Object.assign({}, state, {
				multi: true
			});
		case SELECTED_ITEMS.DEACTIVATE_MULTISELECT:
			return Object.assign({}, state, {
				multi: false
			});
		default:
			return state;
	}
}
