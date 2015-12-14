import React from 'react/addons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SidePanelContainer from './SidePanelContainer';
import FolderItemContainer from './FolderItemContainer';
import * as searchActions from '../actions/searchActions';
import SearchStore from '../stores/SearchStore';
import Router from 'react-router';
import Actions from '../actions/Actions';
import Loader from '../views/Loader';
import _t, {sf} from '../utils/lang';

const SearchPanelContainer = React.createClass({

	mixins: [
		React.addons.PureRenderMixin
	],

	propTypes: {
		routerParams: React.PropTypes.object.isRequired
	},

	componentDidMount () {
		const term = this.props.routerParams.get('search');
		// this.listenTo(SearchStore, this.onSearchChanged);
		if(term) {
			this.props.actions.fetchSearchResults(term);
		}
	},

	componentWillReceiveProps (nextProps) {
		if(this.getTermFromProps() !== this.getTermFromProps(nextProps)) {
			this.props.actions.fetchSearchResults(nextProps.routerParams.get('search'));
		}
	},

	onSearchChanged () {
		// this.setState(getStoreState());
	},

	getTermFromProps (props) {
		props = props || this.props;
		return props.routerParams.get('search');
	},

	render () {
		const items = this.props.items;
		return (
			<SidePanelContainer title={sf(_t('KickAssets.SEARCHFOR','Search for %s'), this.getTermFromProps())}>
				{() => {
					if(this.props.isFetching) {
						return <Loader type='bounce' />
					}
					if(!items.count()) {
						return <div className="alert alert-danger">No results</div>
					}
					return (
						<div>
							{items.map(item => {
								return <FolderItemContainer key={item.id} data={item} />
							})}
						</div>
					);
				}()}
			</SidePanelContainer>
		);
	}

});

function mapStateToProps(state) {
	return {
		term: state.search.term,
		items: state.search.items,
		isFetching: state.search.isFetching
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(searchActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelContainer);
