import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";

let styles = {
    loginPasswordBox: {
        fontSize: "18px",
        width: "210px",
        height: "28px",
        padding: "3px",
        border: "none",
        marginBottom: "15px",
        boxSizing: "unset",
    }
}

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
                style={styles.loginPasswordBox}
                type="password"
            />
        )
    }
}
