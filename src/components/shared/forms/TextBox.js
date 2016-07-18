//import React from "react";

@Radium
export default class TextBox extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        style: React.PropTypes.object,
        autocapitalize: React.PropTypes.boolean,
        autocorrect: React.PropTypes.boolean,
    }
    static defaultProps = {
        autocapitalize: true,
        autocorrect: true,
    }

    render() {
        return (
            <input
                type="text"
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                style={this.props.style}
                autocapitalize={this.props.autocapitalize ? "on" : "off"}
                autocorrect={this.props.autocorrect ? "on" : "off"}
            />
        )
    }
}
