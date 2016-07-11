//import React from "react";

export default class Link extends React.Component {

    static propTypes = {
        location: React.PropTypes.string,
        text: React.PropTypes.string
    }

    render() {
        return (
            <a href={this.props.location}>{this.props.text}</a>
        )
    }
}
