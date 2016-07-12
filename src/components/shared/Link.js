//import React from "react";

export default class Link extends React.Component {

    static propTypes = {
        location: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
    }

    render() {
        return (
            <a href={this.props.location}>{this.props.text}</a>
        )
    }
}
