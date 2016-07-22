import React from "react";
import Radium from "radium";

@Radium
export default class CheckBox extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool,
    }
    static defaultProps = {
        checked: false,
    }

    render() {
        return (
            <input
                type="checkbox"
                checked={this.props.checked}
                onClick={this.props.onChange}
            />
        )
    }
}
