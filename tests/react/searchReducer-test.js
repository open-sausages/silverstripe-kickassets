jest.dontMock('../../javascript/src/constants/actionTypes.js');
jest.dontMock('../../javascript/src/reducers/searchReducer.js');

var reducer = require('../../javascript/src/reducers/searchReducer.js');

describe('searchRedcer', () => {

	describe('REQUEST_SEARCH', () => {
		it('should set "term"', () => {
			const state = {
				term: []
			};

			const result = reducer(state, { type: 'REQUEST_SEARCH', payload: {term: 'foo'} });

			expect(result.term).toBe('foo');
		});
	});

});
