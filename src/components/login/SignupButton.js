import React from "react";

import Button from "~/components/shared/forms/Button";

let styles = {
    signupButton: {
        backgroundColor: "#00A2FF",
        border: "0",
        borderRadius: "1px",
        fontSize: "18px",
        position: "relative",
        width: "210px",
        height: "32px",
        padding: "5px",
        ":hover": {
            backgroundColor: "#008BDB",
        }
    }
}

export default class SignupButton extends React.Component {

    onClick() {
        window.location.assign("/signup");
    }

    render() {
        return (
            <Button style={[styles.signupButton]} text="Sign Up" onClick={this.onClick} />
        )
    }
}
