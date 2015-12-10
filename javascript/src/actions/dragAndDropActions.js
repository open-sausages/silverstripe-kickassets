/**
 * @file Actions for making updates to the dragAndDrop section of the store's state.
 */

import { DRAG_AND_DROP } from '../constants/actionTypes';
import clone from 'clone';
import Immutable from 'immutable';

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
 * @func dragItem
 * @param object item - item being dragged.
 * @return function
 *
 * @desc Saving the currently dragging item into the dragAndDrop state and setting the isDragging flag.
 */
export function dragItem(item) {
    return (dispatch, getState) => {
        return dispatch({
            type: DRAG_AND_DROP.DRAG_ITEM,
            payload: {
                items: [item]
            }
        });
    }
}

/**
 * @func endDragging
 * @return function
 *
 * @desc Emptying the dragAndDrop state and removing the isDragging flag.
 */
export function endDragging() {
    return (dispatch, getState) => {
        return dispatch({
            type: DRAG_AND_DROP.END_DRAGGING,
            payload: {
                items: []
            }
        });
    }
}
