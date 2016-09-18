import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import Button from "~/shared/components/forms/Button";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import Link from "~/shared/components/Link";
import Form from "~/shared/components/forms/Form";
import FileUpload from "~/shared/components/forms/FileUpload";
import TextBox from "~/shared/components/forms/TextBox";
import ajax from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import styles from "~/signup/styles";
import { withCss } from "~/util/component";

const SignupInput = withCss(TextBox, styles.input);

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
            file: null,
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
            let obj = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phone,
            };
            if (this.state.file) {
                obj.profpic = this.state.file;
                const formData = new FormData();
                for (const key of Object.keys(obj)) {
                    formData.append(key, obj[key]);
                }
                obj = formData;
            }
            await ajax.request("post", "/users", obj);
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
            <Root pageName="signup">
                <Link location="login" text="Back to login" />
                <div style={styles.container}>
                    <Form style={styles.form} onSubmit={this.onSubmit}>
                        <SignupInput
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.getChangeHandler("firstname")}
                            autoFocus
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
                        <Button
                            style={styles.fileButton}
                            text="Choose Profile Picture"
                            onClick={() => $("#fileUpload").trigger("click")}
                        />
                        <FileUpload
                            id="fileUpload"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(event) => this.setState({ file: event.target.files[0] })}
                        />
                        <ErrorMsg message={this.state.errorMsg} />
                        <SubmitButton
                            style={styles.submitButton}
                            text="Submit"
                        />
                    </Form>
                </div>
            </Root>
        )
    }
}

pageInit(Signup);
