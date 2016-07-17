//import React from "react";

export default class Link extends React.Component {

    static propTypes = {
        location: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        style: React.PropTypes.object,
    }

    render() {
        return (
            <a style={this.props.style} href={this.props.location}>{this.props.text}</a>
        )
    }
}
