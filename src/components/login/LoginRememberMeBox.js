import React from "react";

import CheckBox from "~/components/shared/forms/CheckBox";

export default class LoginRememberMeBox extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool.isRequired,
    }

    render() {
        return (
            <CheckBox
                checked={this.props.checked}
                onChange={this.props.onChange}
            />
        )
    }
}
