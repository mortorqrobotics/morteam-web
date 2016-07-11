//import React from "react";

export default class TextBox extends React.Component {
    render() {
        return (
            <input
                type="text"
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                // style={this.props.style}
            />
        )
    }
}
