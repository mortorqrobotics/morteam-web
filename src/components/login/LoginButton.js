import React from "react";

import SubmitButton from "~/components/shared/forms/SubmitButton";

let styles = {
    loginButton: {
        backgroundColor: "orange",
        border: "0",
        borderRadius: "1px",
        fontSize: "18px",
        marginTop: "15px",
        position: "relative",
        width: "210px",
        height: "32px",
        padding: "5px",
        ":hover": {
            backgroundColor: "darkorange",
        }
    }
}

export default class LoginButton extends React.Component {

    render() {
        return (
            <SubmitButton style={[styles.loginButton]} text="Login" />
        )
    }
}
