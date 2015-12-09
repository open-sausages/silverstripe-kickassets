import React from 'react/addons';
import Router from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as selectedItemsActions from '../actions/selectedItemsActions';
import TopBar from '../views/TopBar';
import BrowseBar from '../views/BrowseBar';
import Browse from './Browse';
import Actions from '../actions/Actions';
import Navigation from '../actions/Navigation';
import Immutable from 'immutable';
import SelectedItemsStore from '../stores/SelectedItemsStore';

const Main = React.createClass({

	mixins: [
		Router.State
	],

	getInitialState () {
		return {
			routerParams: Immutable.Map()
		}
	},

	componentWillMount () {
		Navigation.initRouter(this.context.router);
		this.loadRouterParams();
	},

	componentDidMount () {
		Actions.getFolders();
		document.addEventListener('keyup', this.keyUpListener);
		document.addEventListener('keydown', this.keyDownListener);
	},

	componentWillReceiveProps (nextProps) {
		this.loadRouterParams(nextProps);
	},

	keyDownListener (e) {
		if(e.metaKey && this.props.selectedItems.multi === false) {
			this.props.actions.activateMultiSelect();
		}
	},

	keyUpListener (e) {
		if(!e.metaKey && this.props.selectedItems.multi === true) {
			this.props.actions.deactivateMultiSelect();
		}
	},

	loadRouterParams (props) {
		props = props || this.props;
		const newParams = Immutable.Map({
			folderParams: Immutable.Map({
				folderID: props.params.folderID,
				sort: props.query.sort || props.config.defaultSort
			}),
			fileID: props.params.fileID,
			search: props.query.q,
			view: props.query.view || props.config.defaultView,
			path: this.context.router.getCurrentPathname(),
			recent: props.params.folderID === 'recent'
		});

		if(!Immutable.is(this.state.routerParams, newParams)) {	
			this.setState({
				routerParams: newParams
			});
		}
	},

	render() {
		if(!this.state.routerParams.get('folderParams')) return <div />;

		return (
			<div id="kickassets">
				<TopBar routerParams={this.state.routerParams} />
				{!this.state.routerParams.get('recent') &&
					<BrowseBar routerParams={this.state.routerParams} />
				}
				<div className="ka-folder-items">
					<Browse routerParams={this.state.routerParams} />
				</div>
			</div>
		);
	}

});

function mapStateToProps(state) {
	return {
		config: state.config,
		selectedItems: state.selectedItems
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(selectedItemsActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
