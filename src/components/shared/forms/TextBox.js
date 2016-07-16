//import React from "react";

export default class TextBox extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
    }

    render() {
        return (
            <input
                type="text"
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
            />
        )
    }
}
