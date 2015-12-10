/**
 * @file Actions for making updates to the dragAndDrop section of the store's state.
 */

import { DRAG_AND_DROP } from '../constants/actionTypes';
import clone from 'clone';

/**
 * @func dragSelectedItems
 * @param array selectedItems - Currently selected items.
 * @return function
 *
 * @desc Saving the currently selected items into the dragAndDrop state and setting the isDragging flag.
 */
export function dragSelectedItems(selectedItems) {
    return (dispatch, getState) => {
        // Clone selectedItems to give payload different object references.
        const draggedItems = clone(selectedItems);

        return dispatch({
            type: DRAG_AND_DROP.DRAG_SELECTED_ITEMS,
            payload: {
                items: draggedItems
            }
        });
    }
}

/**
 * @func activateMultiSelect
 * @return function
 *
 * @desc Activates multiselect.
 */
// export function activateMultiSelect() {
// 	return (dispatch, getState) => {
// 		return dispatch({
// 			type: SELECTED_ITEMS.ACTIVATE_MULTISELECT
// 		});
// 	};
// }