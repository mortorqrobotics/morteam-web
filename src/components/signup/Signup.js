//import React from "react";

import SubmitButton from "../shared/forms/SubmitButton";
import SignupInput from "./SignupInput";
import Link from "../shared/Link";
import ajax from "../../util/ajax.js";
import {
    makeChangeHandlerFactory
} from "../../util";


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
                <form action="javascript:void 0" onSubmit={this.onSubmit}>
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
                        <input type="submit" />
                </form>

                <Link location="login" text="Back to login" />

            </div>
        )
    }
}

window.Page = Signup;
