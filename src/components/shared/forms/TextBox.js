//import React from "react";

export default class TextBox extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
    }

    render() {
        return (
            <input
                type="text"
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                className={this.props.className}
            />
        )
    }
}
