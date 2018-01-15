import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import TextBox from "~/shared/components/forms/TextBox";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import Button from "~/shared/components/forms/Button";
import RememberMeBox from "~/login/components/RememberMeBox";
import Link from "~/shared/components/Link";
import Form from "~/shared/components/forms/Form";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import styles from "~/login/styles/loginBox";
import site, {
    redirects
} from "~/AppInfo";

@Radium
export default class LoginBox extends React.Component {

    state = {
        username: "",
        password: "",
        checkedRM: false,
        errorMsg: "",
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    onSubmit = async () => {
        try {
            let { data: user } = await ajax.request("post", "/login", {
                username: this.state.username,
                password: this.state.password,
                rememberMe: this.state.checkedRM,
            });
            this.setState({
                errorMsg: "Success"
            });
            localStorage.username = user.username;
            localStorage.firstname = user.firstname;
            localStorage.lastname = user.lastname;
            localStorage._id = user._id;
            localStorage.phone = user.phone;
            localStorage.email = user.email;
            localStorage.profpicpath = user.profpicpath;
            if (user.team) {
                localStorage.c_team = user.team._id;
                localStorage.c_team_position = user.position;
                localStorage.teamNumber = user.team.number;
                localStorage.teamName = user.team.name;
            }
            setTimeout(() => {
                if (window.location.search && window.location.search !== "?") {// Checks for GET parameters
                    let red = window.location.search.substr(1);// Get GET parameters without prefixed "?"
                    if (redirects.indexOf(red) !== -1) {// Redirect
                        window.location.assign("//" + red + "." + site);
                    } else {// Redirect to home b/c of unknown redirect
                        window.location.assign("/");
                    }
                } else {// no redirect
                    window.location.assign("/");
                }
            }, REDIR_TIME);
        } catch ({ response: { data } }) {
            this.setState({
                errorMsg: data
            });
        }
    }

    render() {
        return (
            <div style={styles.wrapper}>

                <Form onSubmit={this.onSubmit}>

                    <TextBox
                        autoFocus
                        value={this.state.username}
                        onChange={this.getChangeHandler("username")}
                        style={styles.textBox}
                        placeholder="Username/Email"
                    />
                    <br />
                    <TextBox
                        value={this.state.password}
                        onChange={this.getChangeHandler("password")}
                        style={styles.textBox}
                        placeholder="Password"
                        type="password"
                    />
                    <br />
                    <RememberMeBox
                        checked={this.state.checkedRM}
                        onChange={this.getChangeHandler("checkedRM", "checked")}
                    />
                    <br />

                    <SubmitButton
                        style={styles.loginButton}
                        text="Login"
                    />
                    <br />

                    {this.state.errorMsg && (
                        <ErrorMsg
                            message={this.state.errorMsg}
                            style={styles.errorMsg}
                        />
                    )}

                </Form>

                <Button
                    style={styles.signupButton}
                    text="Sign Up"
                    onClick={() => window.location.assign("/signup")}
                />

                <br />
                <br />

                <Link style={styles.fpLink} location="/fp" text="Forgot password?" />
            </div>
        )
    }
}
