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
                autoFocus
                onChange={this.props.onChange} 
                value={this.props.value}
                autoCapitalize={false} 
                autoCorrect={false} 
                placeholder="Username/Email"
                style={styles.box.textBox}
            />
        )
    }
}
