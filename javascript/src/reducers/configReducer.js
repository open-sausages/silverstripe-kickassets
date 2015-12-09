/**
 * @file Reducers for application's config.
 */

import { CONFIG } from '../constants/actionTypes';

const initialState = {
	config: window.KickAssetsConfig
};

/**
 * @func configReducer
 * @param object initialState
 * @param object action - The dispatched action.
 * @param string action.type - Name of the dispatched action.
 * @param object [action.payload] - Optional data passed with the action.
 * @desc Reducer for the `config` section of state.
 */
export default function configReducer(state = initialState, action) {
	/*
	 * There are currently no actions associated with config
	 * because config options are set as a global in the SilverStripe template.
	 * This is here as a placeholder and will be useful if config options
	 * need to be updated from inside the React app.
	 */
	return state;
}
