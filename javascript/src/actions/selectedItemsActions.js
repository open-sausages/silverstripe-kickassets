/**
 * @file Actions for making updates to the selectedItems section of the store's state.
 */

import { SELECTED_ITEMS } from '../constants/actionTypes';

/**
 * @func activateMultiSelect
 * @return function
 * @desc Activates multiselect.
 */
export function activateMultiSelect() {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.ACTIVATE_MULTISELECT
		});
	};
}

/**
 * @func deactivateMultiSelect
 * @return function
 * @desc Dectivates multiselect.
 */
export function deactivateMultiSelect() {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.DEACTIVATE_MULTISELECT
		});
	};
}

/**
 * @func toggleSelectionOnItem
 * @return function
 * @desc Toggles the selected state of an item.
 */
export function toggleSelectionOnItem(id) {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.TOGGLE_SELECTED,
			payload: { id: id }
		});
	};
}
