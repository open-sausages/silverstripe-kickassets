/**
 * @file Actions for making updates to the selectedItems section of the store's state.
 */

import { SELECTED_ITEMS } from '../constants/actionTypes';

/**
 * @func activateMultiSelect
 * @return function
 *
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
 *
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
 * @param number id
 * @return function
 *
 * @desc Toggles the selected state of an item.
 */
export function toggleSelectionOnItem(id) {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.TOGGLE_SELECTED,
			payload: { id }
		});
	};
}

/**
 * @func groupSelect
 * @param array ids
 * @return function
 *
 * @desc Selects a group of items.
 */
export function groupSelect(ids) {
	return (dispatch, getState) => {
		// Transform the ids into a consistant format for the reducer.
		const parsedIdsList = ids.map((id) => {
			return { id: parseInt(id, 10) };
		});

		return dispatch({
			type: SELECTED_ITEMS.GROUP_SELECT,
			payload: parsedIdsList
		});
	};
}

/**
 * @func clearSelection
 * @return function
 *
 * @desc Deselects all currently selected items.
 */
export function clearSelection() {
	return (dispatch, getState) => {
		return dispatch({
			type: SELECTED_ITEMS.CLEAR_SELECTION
		});
	};
}
