import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import LoginUsernameBox from "~/components/login/LoginUsernameBox";
import LoginPasswordBox from "~/components/login/LoginPasswordBox";
import LoginRememberMeBox from "~/components/login/LoginRememberMeBox";
import LoginButton from "~/components/login/LoginButton";
import SignupButton from "~/components/login/SignupButton";
import Link from "~/components/shared/Link";
import Form from "~/components/shared/forms/Form";
import ErrorMsg from "~/components/shared/forms/ErrorMsg";

let styles = {
    loginBox: {
        backgroundColor: "#FFC547",
        width: "260px",
        height: "auto",
        position: "fixed",
        right: "10px",
        textAlign: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
        top: "230px",
    },
    fpLink: {
        fontSize: "14px",
        textDecoration: "underline",
    }
}

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
            let { data } = await ajax.request("post", ajax.getRoute("login"), {
                username: this.state.username,
                password: this.state.password,
                rememberMe: this.state.checkedRM,
            });
            this.setState({
                errorMsg: "Success"
            });
            setTimeout(() => window.location.assign("/"), REDIR_TIME);
        } catch ({ data }) {
            this.setState({
                errorMsg: data
            });
        }
    }


    render() {
        return (
            <div style={styles.loginBox}>
                
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
                    <br />

                    <ErrorMsg message={this.state.errorMsg} />
                    <br />

                    <LoginButton />

                </Form>

                <SignupButton />
                
                <br />
                <br />
                
    			<Link style={styles.fpLink} location="/fp" text="Forgot password?" />
    		</div>
        )
    }
}
