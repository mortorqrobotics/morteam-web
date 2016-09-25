import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import LoginUsernameBox from "~/login/components/LoginUsernameBox";
import LoginPasswordBox from "~/login/components/LoginPasswordBox";
import LoginRememberMeBox from "~/login/components/LoginRememberMeBox";
import LoginButton from "~/login/components/LoginButton";
import SignupButton from "~/login/components/SignupButton";
import Link from "~/shared/components/Link";
import Form from "~/shared/components/forms/Form";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";

import styles from "~/login/styles";

@Radium
export default class LoginBox extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            username: "",
            password: "",
            checkedRM: false,
            errorMsg: "",
        }

    }

    onSubmit = async() => {
        try {
            let { data } = await ajax.request("post", "/login", {
                username: this.state.username,
                password: this.state.password,
                rememberMe: this.state.checkedRM,
            });
            this.setState({
                errorMsg: "Success"
            });
            setTimeout(() => window.location.assign("/"), REDIR_TIME);
        } catch ({ response: { data } }) {
            this.setState({
                errorMsg: data
            });
        }
    }                                  
                  

    render() {
        return (
            <div style={styles.box.wrapper}>
                                                
                <Form onSubmit={this.onSubmit}>

                    <LoginUsernameBox
                        value={this.state.username}
                        onChange={this.getChangeHandler("username")}
                    />
                    <br />                                  
                    <LoginPasswordBox
                        value={this.state.password}
                        onChange={this.getChangeHandler("password")}
                    />
                    <br />
                    <LoginRememberMeBox
                        checked={this.state.checkedRM}
                        onChange={this.getChangeHandler("checkedRM", "checked")}
                    />
                    <label
                        htmlFor="login-checkbox"
                        style={styles.box.rememberMeLabel}
                    >
                        Remember me?
                    </label>
                    <br />

                    <LoginButton />
                    <br />

                    {this.state.errorMsg && (
                        <ErrorMsg
                            message={this.state.errorMsg}
                            style={styles.box.errorMsg}
                        />
                    )}

                </Form>

                <SignupButton />
                
                <br />
                <br />
                
    			<Link style={styles.box.fpLink} location="/fp" text="Forgot password?" />
    		</div>
        )
    }
}
