/**
 * @file Actions for searching files and folders.
 */

import { SEARCH } from '../constants/actionTypes';
import API from '../utils/API';
import _t from '../utils/lang';

/**
 * @func performSearch
 * @return function
 */
export function fetchSearchResults(term) {
	return (dispatch, getState) => {
		dispatch({
			type: SEARCH.REQUEST_SEARCH,
      payload: {
        term: term
      }
		});

    if(!term) {
      return;
    }

    // TODO Generic response handler
  	return API.findByTerm(term)
  		.end(function(err, res) {
        if (err || !res.ok) {
        	throw _t(
        		'KickAssets.GENERICERROR',
        		'<p>You may have found a bug.</p><p>If you have discovered a problem with this module, <a href=\"http://github.com/unclecheese/silverstripe-kickassets\">post an issue on the Github page.</a></p>'
        	);
        }

        dispatch({
          type: SEARCH.RECEIVE_SEARCH,
          payload: {
            items: res.body
          }
        });
      });
	};
}
