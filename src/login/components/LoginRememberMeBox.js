import React from "react";

import CheckBox from "~/shared/components/forms/CheckBox";

const style = {
    float: "left",
    marginLeft: "30px",
    transform: "scale(1.5)",
    outline: "none",
}

export default class LoginRememberMeBox extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool.isRequired,
    }

    render() {
        return (
            <CheckBox
                id="login-checkbox"
                style={style}
                checked={this.props.checked}
                onChange={this.props.onChange}
            />
        )
    }
}
