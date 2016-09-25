import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";

import styles from "~/login/styles";

@Radium
export default class LoginUsernameBox extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string.isRequired,
    }

    render() {
        return (
            <TextBox 
                value={this.props.value}
                onChange={this.props.onChange} 
                autoCapitalize={false} 
                autoCorrect={false} 
                placeholder="Password"
                style={styles.box.passwordBox}
                type="password"
            />
        )
    }
}
