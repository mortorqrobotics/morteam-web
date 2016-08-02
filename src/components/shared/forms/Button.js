 import React from "react";
import Radium from "radium";

@Radium
export default class Button extends React.Component {

    static propTypes = {
        text: React.PropTypes.string,
        style: React.PropTypes.object,
        onClick: React.PropTypes.func,
    }

    render() {
        return (
            <input
                type="button"
                onClick={this.props.onClick}
                value={this.props.text}
                style={this.props.style}
            />
        )
    }
}
