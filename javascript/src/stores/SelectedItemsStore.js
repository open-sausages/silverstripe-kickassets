import Reflux from 'reflux';
import Immutable from 'immutable';
import ImmutableStoreMixin from '../mixins/ImmutableStoreMixin';
import FolderItemsStore from './FolderItemsStore';
import Actions from '../actions/Actions';
import Config from './Config';

const _state = {
	data: Immutable.List(),
	multi: false
};

const SelectedItemsStore = Reflux.createStore({

	listenables: [Actions],

	mixins: [ImmutableStoreMixin(_state)],

	isMulti () {
		return _state.multi;
	},

	onDeleteSelected () {
		_state.data = _state.data.clear();

		this.trigger();
	},

	onMoveSelected () {
		_state.data = _state.data.clear();

		this.trigger();
	},

	onDropItems (items, target) {
		_state.data = _state.data.filter(item => items.indexOf(item.get('id')) === -1);

		this.trigger();
	}
});

export default SelectedItemsStore;