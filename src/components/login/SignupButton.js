import React from "react";

import Button from "~/components/shared/forms/Button";

let styles = {
    signupButton: {
        backgroundColor: "#0099FF",
    	border: "0",
    	borderRadius: "1px",
    	fontSize: "32px",
    	marginTop: "20px",
    	position: "relative",
    	width: "300px",
    	left: "50%",
    	marginLeft: "-150px",
    	height: "50px",
    	boxShadow: "1.5px 3px 8px -2px #BA7000",
    }
}

export default class LoginButton extends React.Component {

    onClick() {
        window.location.assign("/signup");
    }

    render() {
        return (
            <Button style={[styles.signupButton]}text="Sign Up" onClick={this.onClick} />
        )
    }
}
