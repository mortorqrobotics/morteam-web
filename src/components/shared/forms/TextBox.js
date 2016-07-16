//import React from "react";

@Radium
export default class TextBox extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        style: React.PropTypes.object
    }

    render() {
        return (
            <input
                type="text"
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                style={this.props.style}
            />
        )
    }
}
