jest.dontMock('../../javascript/src/constants/actionTypes.js');
jest.dontMock('../../javascript/src/reducers/dragAndDropReducer.js');

var dragAndDropReducer = require('../../javascript/src/reducers/dragAndDropReducer.js');

describe('dragAndDropReducer', () => {

	describe('DRAG_SELECTED_ITEMS', () => {
        var result;
        
        beforeEach(() => {
			const state = {
				items: [],
                isDragging: false
			};
            
            result = dragAndDropReducer(
                state, 
                {
                    type: 'DRAG_SELECTED_ITEMS',
                    payload: {
                        items: [{
                            id: 1
                        }, 
                        {
                            id: 2
                        }]
                    }
                }
            );
        });
        
        it('should set the isDragging flag to true', () => {
            expect(result.isDragging).toBe(true);    
		});
        
        it('should add the currently dragging items to state', () => {            
            expect(result.items.length).toBe(2);
		});
	});
	
	describe('DRAG_ITEM', () => {
        var result;
        
        beforeEach(() => {
			const state = {
				items: [],
                isDragging: false
			};
            
            result = dragAndDropReducer(
                state, 
                {
                    type: 'DRAG_ITEM',
                    payload: {
                        items: [{
                            id: 1
                        }]
                    }
                }
            );
        });
        
        it('should set the isDragging flag to true', () => {
            expect(result.isDragging).toBe(true);    
		});
        
        it('should add the currently dragging item to state', () => {            
            expect(result.items.length).toBe(1);
		});
	});
});
