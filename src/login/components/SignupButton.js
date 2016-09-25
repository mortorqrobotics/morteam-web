import React from "react";

import Button from "~/shared/components/forms/Button";

import styles from "~/login/styles";

export default class SignupButton extends React.Component {

    onClick() {
        window.location.assign("/signup");
    }

    render() {
        return (
            <Button style={[styles.box.signupButton]} text="Sign Up" onClick={this.onClick} />
        )
    }
}
