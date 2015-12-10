jest.dontMock('../../javascript/src/constants/actionTypes.js');
jest.dontMock('../../javascript/src/reducers/selectedItemsReducer.js');

var selectedItemsReducer = require('../../javascript/src/reducers/selectedItemsReducer.js');

describe('selectedItemsReducer', () => {

	describe('ACTIVATE_MULTISELECT', () => {
		it('should set "multi" to true when ACTIVATE_MULTISELECT is dispatched', () => {
			const state = {
				data: [],
				multi: false
			};

			const result = selectedItemsReducer(state, { type: 'ACTIVATE_MULTISELECT' });

			expect(result.multi).toBe(true);
		});
	});

	describe('DEACTIVATE_MULTISELECT', () => {
		it('should set "multi" to false when DEACTIVATE_MULTISELECT is dispatched', () => {
			const state = {
				data: [],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'DEACTIVATE_MULTISELECT' });

			expect(result.multi).toBe(false);
		});
	});

	describe('TOGGLE_SELECTED', () => {
		it('should add an item to the list when selecting an item in multi-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'TOGGLE_SELECTED', payload: { id: 3 } });

			expect(result.data.length).toBe(3);
		});

		it('should remove an item from list when deselecting an item in multi-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'TOGGLE_SELECTED', payload: { id: 3 } });

			expect(result.data.length).toBe(2);
		});

		it('should make the selected item the only item in the list when in single-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: false
			};

			const result = selectedItemsReducer(state, { type: 'TOGGLE_SELECTED', payload: { id: 4 } });

			expect(result.data.length).toBe(1);
			expect(result.data[0].id).toBe(4);
		});

		it('should clear the list when deselecting an item in single-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: false
			};

			const result = selectedItemsReducer(state, { type: 'TOGGLE_SELECTED', payload: { id: 3 } });

			expect(result.data.length).toBe(0);
		});
	});

	describe('GROUP_SELECT', () => {
		it('should clear the list when tring to select a group while in single-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: false
			};

			const result = selectedItemsReducer(state, { type: 'GROUP_SELECT', payload: [{ id: 3 }, { id: 4 }] });

			expect(result.data.length).toBe(0);
		});

		it('should not deselect currently selected items', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'GROUP_SELECT', payload: [{ id: 3 }] });

			expect(result.data[2].id).toBe(3);
		});

		it('should not select items twice', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'GROUP_SELECT', payload: [{ id: 3 }] });

			expect(result.data.length).toBe(3);
		});

		it('should add any item which are currently selected to the selected items list', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'GROUP_SELECT', payload: [{ id: 4 }, { id: 5 }] });

			expect(result.data.length).toBe(5);
		});
	});

	describe('CLEAR_SELECTION', () => {
		it('should deselect all currently selected items in multi-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: true
			};

			const result = selectedItemsReducer(state, { type: 'CLEAR_SELECTION' });

			expect(result.data.length).toBe(0);
		});

		it('should deselect all currently selected items in single-select mode', () => {
			const state = {
				data: [{ id: 1 }, { id: 2 }, { id: 3 }],
				multi: false
			};

			const result = selectedItemsReducer(state, { type: 'CLEAR_SELECTION' });

			expect(result.data.length).toBe(0);
		});
	});

});
