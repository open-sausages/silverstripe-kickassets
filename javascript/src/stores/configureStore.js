/**
 * @file Factory for creating a Redux store.
 */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // Used for handling async store updates.
import rootReducer from '../reducers';

/**
 * @func createStoreWithMiddleware
 * @param function rootReducer
 * @param object initialState
 * @desc Creates a Redux store with some middleware applied.
 * @private
 */
const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore);

/**
 * @func configureStore
 * @param object initialState
 * @return object - A Redux store that lets you read the state, dispatch actions and subscribe to changes.
 */
export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	return store;
};
