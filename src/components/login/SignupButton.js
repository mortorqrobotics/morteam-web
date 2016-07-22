import React from "react";

import Button from "~/components/shared/forms/Button";

export default class LoginButton extends React.Component {

    onClick() {
        window.location.assign("/signup");
    }

    render() {
        return (
            <Button text="Sign Up" onClick={this.onClick} />
        )
    }
}
