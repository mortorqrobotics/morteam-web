import React from "react";

import SubmitButton from "../shared/forms/SubmitButton";
import SignupInput from "../signup/SignupInput";
import ajax from "../util/ajax";


let self;

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        self = that;
        self.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            phoneNumber: ""
        };

    }

    handlerCache = {};
    getChangeHandler(name) {
        if (handlerCache[name]) {
            return handlerCache[name];
        } else {
            handlerCache[name] = function(event) {
                let obj = {};
                obj[name] = event.target.value;
                self.setState(obj);
            };
            return handlerCache[name];
        }
    }

    async onSubmit() {
        if (self.state.password != self.state.confirmPassword) {
            return alert("get rid of this alert");
        }
        let result = await ajax.post("/users", {
            firstname: self.state.firstname,
            lastname: self.state.lastname,
            username: self.state.username,
            password: self.state.password,
            email: self.state.email,
            phone: self.state.phone,
        });
    }


    render() {
        return (
            <div>
                <form style="text-align: center;" id="signup_form" enctype="multipart/form-data" action="/users" method="post">
                    <SignupInput placeholder="First Name" value={self.state.firstname} onChange={self.getChangeHandler("firstname")} />
                    <SignupInput placeholder="Last Name" value={self.state.lastname} onChange={self.getChangeHandler("lastname")} />
                    <SignupInput placeholder="Username" value={self.state.username} onChange={self.getChangeHandler("username")} />
                    <SignupInput placeholder="Password" value={self.state.password} onChange={self.getChangeHandler("password")} />
                    <SignupInput placeholder="Confirm Password" value={self.state.confirmPassword} onChange={self.getChangeHandler("confirmPassword")} />
                    <SignupInput placeholder="Email" value={self.state.email} onChange={self.getChangeHandler("email")} />
                    <SignupInput placeholder="Phone Number" value={self.state.phoneNumber} onChange={self.getChangeHandler("phoneNumber")} />
                </form>
               <Link location="login" text="Back to login" />
            </div>
        )
    }

}
