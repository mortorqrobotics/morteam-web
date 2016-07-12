//import React from "react";

import SubmitButton from "../shared/forms/SubmitButton";
import SignupInput from "./SignupInput";
import Link from "../shared/Link";
import ajax from "../../util/ajax";


export default class Signup extends React.Component {

    constructor(props) {
        super(props);

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

    handlerCache = {}
    getChangeHandler(name) {
        if (this.handlerCache[name]) {
            return this.handlerCache[name];
        } else {
            this.handlerCache[name] = function(event) {
                let obj = {};
                obj[name] = event.target.value;
                this.setState(obj);
            }.bind(this);
            return this.handlerCache[name];
        }
    }.bind(this);

    async onSubmit() {
        if (this.state.password != this.state.confirmPassword) {
            return alert("get rid of this alert");
        }
        let result = await ajax("post", "/users", {
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
                // style="text-align: center;" id="signup_form" enctype="multipart/form-data" action="/users" method="post">
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
