import React from 'react';
import { connect } from 'react-redux';

const FolderItemImage = React.createClass({

	propTypes: {
		type: React.PropTypes.oneOf(['image', 'file', 'folder']),
		iconURL: React.PropTypes.string,
		title: React.PropTypes.string,
		extension: React.PropTypes.string
	},

	getInitialState () {
		return {
			src: this.props.iconURL || this.getIconPath(this.props.extension)
		}
	},

	componentWillReceiveProps (nextProps) {
		this.setState({
			src: nextProps.iconURL || this.getIconPath(nextProps.extension)
		});
	},

	getIconPath () {
		const ext = this.props.extension || this.props.title.split('.').pop().toLowerCase(),
			  iconSize = this.props.config.iconSize,
			  thumbnailsDir = this.props.config.thumbnailsDir;

		return `${thumbnailsDir}/${iconSize}px/${ext}.png`;
	},

	showBlank () {
		this.setState({
			src: this.getIconPath('_blank')
		});
	},

	render () {
		return <img draggable={false} src={this.state.src} onError={this.showBlank} />
	}
});

function mapStateToProps(state) {
	return {
		config: state.config
	}
}

export default connect(mapStateToProps)(FolderItemImage);
