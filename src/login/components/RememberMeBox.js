import React from "react";
import Radium from "radium";

import CheckBox from "~/shared/components/forms/CheckBox";
import styles from "~/login/styles/loginBox";

@Radium
export default class RememberMeBox extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool.isRequired,
    }

    render() {
        return (
            <div>
                <CheckBox
                    id="login-checkbox"
                    style={styles.rememberMeBox}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
                <label
                    htmlFor="login-checkbox"
                    style={styles.rememberMeLabel}
                >
                    Remember me?
                </label>
            </div>
        )
    }
}
