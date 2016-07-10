import React from "react";

export default class TextBox extends React.Component {
    render() {
        return (
            <input type="text" placeholder={self.props.placeholder} style={self.props.style} />
        )
    }
}
