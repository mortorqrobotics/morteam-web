//import React from "react";

import SubmitButton from "~/components/shared/forms/SubmitButton";
import SignupInput from "./SignupInput";
import SubmitSignupButton from "./SubmitSignupButton";
import Link from "~/components/shared/Link";
import ajax from "~/util/ajax.js";
import {
    makeChangeHandlerFactory
} from "../../util";

var styles = {
    form: {
        "position": "relative",
        "textAlign": "center"
    },
    div: {
        "width": "360px",
        "height": "640px",
        "backgroundColor": "#FFC547",
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "margin": "-330px 0 0 -180px",
        "borderRadius": "1px",
        "boxShadow": "3px 5px 10px -2px gray"
    },
    globalDefaults: { //Import later
        "margin": "0",
        "padding": "0",
        "fontFamily": "'exo 2', sans-serif",
        "fontWeight": "200",
        "outline": "0"
    }
}

@Radium
export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            phone: "",
        };

    }


    onSubmit = async function() {
        if (this.state.password != this.state.confirmPassword) {
            return alert("get rid of this alert");
        }
        let result = await ajax.request("post", ajax.getRoute("users"), {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
        });
        console.log(result); // TODO: do stuff
    }.bind(this);


    render() {
        return (
            <div>
                <Link location="login" text="Back to login" />
                <div style={[styles.globalDefaults, styles.div]}>
                    <form style={styles.form} action="javascript:void 0" onSubmit={this.onSubmit}>
                        <SignupInput
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.getChangeHandler("firstname")}
                        />
                        <SignupInput
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.getChangeHandler("lastname")}
                        />
                        <SignupInput
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.getChangeHandler("username")}
                        />
                        <SignupInput
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.getChangeHandler("password")}
                        />
                        <SignupInput
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.getChangeHandler("confirmPassword")}
                        />
                        <SignupInput
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.getChangeHandler("email")}
                        />
                        <SignupInput
                            placeholder="Phone Number"
                            value={this.state.phoneNumber}
                            onChange={this.getChangeHandler("phone")}
                        />
                        <SubmitSignupButton />
                    </form>
                </div>
            </div>
        )
    }
}

window.Page = Signup;
