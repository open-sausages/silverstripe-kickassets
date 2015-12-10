/**
 * @file Reducers for application's drag and drop state.
 */

import { DRAG_AND_DROP } from '../constants/actionTypes';
import clone from 'clone';
import Immutable from 'immutable';

const initialState = {
	items: [],
    isDragging: false
};

/**
 * @func dragAndDropReducer
 * @param object initialState
 * @param object action - The dispatched action.
 * @param string action.type - Name of the dispatched action.
 * @param object [action.payload] - Optional data passed with the action.
 *
 * @desc Reducer for the `dragAndDrop` section of state.
 */
export default function dragAndDropReducer(state = initialState, action) {
	switch (action.type) {
		case DRAG_AND_DROP.DRAG_SELECTED_ITEMS:
            return Object.assign({}, state, {
                items: action.payload.items,
                isDragging: true
            });
		case DRAG_AND_DROP.DRAG_ITEM:
			return Object.assign({}, state, {
				items: action.payload.items,
				isDragging: true
			});
		case DRAG_AND_DROP.END_DRAGGING:
			return Object.assign({}, state, {
				items: action.payload.items,
				isDragging: false
			});
		default:
			return state;
	}
}
