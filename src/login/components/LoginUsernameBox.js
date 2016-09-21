import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";


let styles = {
    loginUsernameBox: {
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
                autoFocus
                onChange={this.props.onChange} 
                value={this.props.value}
                autoCapitalize={false} 
                autoCorrect={false} 
                placeholder="Username/Email"
                style={styles.loginUsernameBox}
            />
        )
    }
}
