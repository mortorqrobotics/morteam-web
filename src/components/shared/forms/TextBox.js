//import React from "react";

export default class TextBox extends React.Component {
    render() {
        return (
            <input type="text" placeholder={this.props.placeholder} /> // style={this.props.style} />
        )
    }
}
