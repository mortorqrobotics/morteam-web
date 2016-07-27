import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import SubmitButton from "~/components/shared/forms/SubmitButton";
import ErrorMsg from "~/components/shared/forms/ErrorMsg";
import SignupInput from "./SignupInput";
import SubmitSignupButton from "./SubmitSignupButton";
import Link from "~/components/shared/Link";
import Form from "~/components/shared/forms/Form";
import ajax from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";

let styles = {
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
            errorMsg: "",
        };

    }


    onSubmit = async() => {
        if (this.state.password != this.state.confirmPassword) {
            return this.setState({
                errorMsg: "Passwords do not match"
            });
        }
        try {
            await ajax.request("post", ajax.getRoute("users"), {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phone,
            });
            this.setState({
                errorMsg: "Success"
            });
            setTimeout(() => window.location.assign("/login"), REDIR_TIME);
        } catch ({ data }) {
            this.setState({
                errorMsg: data
            });
        }
    }


    render() {
        return (
            <Root>
                <Link location="login" text="Back to login" />
                <div style={[styles.div]}>
                    <Form style={styles.form} onSubmit={this.onSubmit}>
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
                        <ErrorMsg message={this.state.errorMsg} />
                        <SubmitSignupButton />
                    </Form>
                </div>
            </Root>
        )
    }
}

pageInit(Signup);
