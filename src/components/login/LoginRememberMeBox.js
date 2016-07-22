import React from "react";

import CheckBox from "~/components/shared/forms/CheckBox";

export default class LoginRememberMeBox extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
    }

    render() {
        return (
            <CheckBox onChange={this.props.onChange} />
        )
    }
}
