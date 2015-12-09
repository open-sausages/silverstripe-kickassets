/**
 * @file Actions for making updates to the selectedItems section of the store's state.
 */

import { SELECTED_ITEMS } from '../constants/actionTypes';

/**
 * @func activateMultiSelect
 * @return function
 * @desc Dispatches an action to activate multiselect.
 */
export function activateMultiSelect() {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.ACTIVATE_MULTISELECT
		});
	}
}

/**
 * @func deactivateMultiSelect
 * @return function
 * @desc Dispatches an action to deactivate multiselect.
 */
export function deactivateMultiSelect() {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.DEACTIVATE_MULTISELECT
		});
	}
}
