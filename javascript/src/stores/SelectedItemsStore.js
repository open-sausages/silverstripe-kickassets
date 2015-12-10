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

	onClearSelection () {
		const newData = _state.data.clear();

		if(newData !== _state.data) {
			_state.data = newData;
			this.trigger();
		}
	},

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
	},

	isValidCount () {
		if(!!Config.get('maxSelection')) {
			return Config.get('maxSelection') >= _state.data.count();
		}

		return true;
	},

	isValidTypes () {
		const types = Config.get('allowedTypes');
		if(!types) return true;

		return _state.data.every(item => types.indexOf(item.get('type')) > -1) 
	},

	isValidExtensions () {
		const exts = Config.get('allowedExtensions')
						.split(',')
						.map(ex => ex.replace(/^\./,''));
		
		if(!exts.length) return true;

		return _state.data.every(item => {
			return exts.indexOf(item.get('extension')) > -1;
		});
	},
	
	isValid () {
		return Config.get('allowSelection') && 
				this.isValidCount() && 
				this.isValidTypes() && 
				this.isValidExtensions();
	}
});

export default SelectedItemsStore;