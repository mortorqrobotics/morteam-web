import React from "react";

import SubmitButton from "~/shared/components/forms/SubmitButton";

import styles from "~/login/styles";

export default class LoginButton extends React.Component {

    render() {
        return (
            <SubmitButton style={[styles.box.loginButton]} text="Login" />
        )
    }
}
