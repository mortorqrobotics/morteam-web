import React from "react";
import Radium from "radium";

@Radium
export default class TextBox extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        style: React.PropTypes.object,
        autoCapitalize: React.PropTypes.bool,
        autoCorrect: React.PropTypes.bool,
        value: React.PropTypes.string,
    }
    static defaultProps = {
        autoCapitalize: true,
        autoCorrect: true,
    }

    render() {
        return (
            <input
                type="text"
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                style={this.props.style}
                autoCapitalize={this.props.autoCapitalize ? "on" : "off"}
                autoCorrect={this.props.autoCorrect ? "on" : "off"}
            />
        )
    }
}
