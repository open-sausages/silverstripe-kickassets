import Reflux from 'reflux';
import Actions from '../actions/Actions';
import ImmutableStoreMixin from '../mixins/ImmutableStoreMixin';
import SelectedItemsStore from './SelectedItemsStore';
import Immutable from 'immutable';

const _state = {
	data: Immutable.List(),
	active: false
};

export default Reflux.createStore({

	listenables: Actions,

	mixins: [ImmutableStoreMixin(_state)],

	onMoveItems () {
		_state.data = Immutable.List();
		_state.active = false;
		
		this.trigger();
	},
	
});