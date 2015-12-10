/**
 * @file Reducers for application's selected items.
 */

import { SELECTED_ITEMS } from '../constants/actionTypes';
import clone from 'clone';

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
		case SELECTED_ITEMS.TOGGLE_SELECTED:
			var selectedItemsList = clone(state.data), // Make a clone so we don't mutate the current state.
				item = selectedItemsList.find((item) => {
					return item.id === action.payload.id;
				});

			// The user has deselected an item while in multi-select mode.
			if (typeof item !== 'undefined' && state.multi === true) {
				// Remove the item from the selected items list.
				selectedItemsList.splice(selectedItemsList.indexOf(item), 1);
			}
			// The user has selected an item while in multi-select mode.
			else if (typeof item === 'undefined' && state.multi === true) {
				// Add the item to the selected items list.
				selectedItemsList.push({ id: action.payload.id });
			}
			// The user has deselected an item while in single-select mode.
			else if (typeof item !== 'undefined' && state.multi === false) {
				// Clear the list, nothing is selected.
				selectedItemsList = [];
			}
			// The user has selected an item while in single-select mode.
			else if (typeof item === 'undefined' && state.multi === false) {
				// The list should only have the newly selected item in it.
				selectedItemsList = [{ id: action.payload.id }];
			}

			return Object.assign({}, state, {
				data: selectedItemsList
			});
		default:
			return state;
	}
}
