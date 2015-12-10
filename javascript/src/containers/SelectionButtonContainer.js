import React from 'react';
import Reflux from 'reflux';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';
import Actions from '../actions/Actions';
import {Glyphicon, Popover} from 'react-bootstrap';
import cx from 'classnames';
import sizeFormatter from '../utils/sizeFormatter';
import _t, {sf} from '../utils/lang';

const getStoreData = () => {
	return {
		error: null
	}
};

const SelectionButtonContainer = React.createClass({

	mixins: [Reflux.ListenerMixin],

	getInitialState() {
		return getStoreData();
	},

	updateSelection () {
		this.setState(getStoreData());
	},

	handleSelect (e) {
		e.preventDefault();

		var error = '';

		if (!this.validCount()) {
			error = sf(_t(
				'KickAssets.TOOMANYSELECTED',
				'You have selected too many items. Please select no more than %s.'
			), this.props.config.maxSelection);
		}

		else if (!this.validTypes()) {
			error = sf(_t(
				'KickAssets.INVALIDTYPESSELECTED',
				'You have selected some invalid items. Please select only %s'
			), this.props.config.allowedTypes.join(', '));
		}

		else if (!this.validExtensions()) {
			error = sf(_t(
				'KickAssets.INVALIDEXTENSIONSSELECTED',
				'You have selected some files with invalid extensions. Please select only %s'
			), this.allowedExtensionsToArray().join(', '));
		}

		if (error !== '') {
			this.setState({error});
		}

		else {
			window.parent.KickAssets.finish(
				this.props.selectedItems.data
			);
		}
	},

	/**
	 * @func allowedExtensionsToArray
	 * @return array
	 *
	 * @desc Returns an array of allowed extensions based on config.
	 */
	allowedExtensionsToArray() {
		return this.props.config.allowedExtensions
			.split(',')
			.map(ex => ex.replace(/^\./, ''));
	},

	/**
	 * @func validExtensions
	 * @return boolean
	 *
	 * @desc Checks every item in the selection has an allowed extension.
	 */
	validExtensions() {
		const allowedExtensions = allowedExtensionsToArray();

		// If there are no allowed extensions, assume everything is allowed.
		if (allowedExtensions.length === 0) {
			return true;
		}

		// Will return false if any item doesn't meet the condition.
		return this.props.selectedItems.data.every((item) => {
			return allowedExtensions.indexOf(item.extension > -1);
		});
	},

	/**
	 * @func validTypes
	 * @return boolean
	 *
	 * @desc Checks every item in the selection is an allowed type.
	 */
	validTypes() {
		const allowedTypes = this.props.config.allowedTypes;

		if (allowedTypes.length === 0) {
			return true;
		}

		// Will return false if any item doesn't meet the condition.
		return this.props.selectedItems.data.every((item) => {
			return allowedTypes.indexOf(item.type > -1);
		});
	},

	/**
	 * @func validCount
	 * @return boolean
	 *
	 * @desc Checks the number of currently selected items does not exceed the maximum allowed by config.
	 */
	validCount() {
		var validCount = true;
		const maxSelection = this.props.config.maxSelection; // 0 means unlimited.
		const selectedItemsCount = this.props.selectedItems.data.length;

		if (maxSelection > 0 && maxSelection < selectedItemsCount) {
			validCount = false;
		}

		return validCount;
	},

	/**
	 * @func valid
	 * @return boolean
	 *
	 * @desc Check the current selection is valid based config, count, type, and extension.
	 */
	valid() {
		return this.props.config.allowSelection === true && 
			this.isValidCount() && 
			this.isValidTypes() && 
			this.isValidExtensions();
	},

	render () {
		const isValidSelection = this.valid();
		const count = isValidSelection ? this.props.selectedItems.length : "!";
		const classes = cx({
			'badged-button': true,
			'btn': true,
			'btn-success': true,
		});
		return (
			<div>
				<Button className={classes} onClick={this.handleSelect}>
					{(!isValidSelection || count > 0) &&
						<span className="badge badge-danger">{count}</span>
					}

					{sf(_t('KickAssets.SELECTNUMBERITEMS','Done'), count)}
					<Glyphicon glyph="chevron-right" />
				</Button>
				{this.state.error && 
					<Popover placement="left" positionLeft={50} positionTop={-10}>
						{this.state.error}
					</Popover>
				}
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

export default connect(mapStateToProps)(SelectionButtonContainer);
