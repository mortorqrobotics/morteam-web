import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import { makeChangeHandlerFactory } from "~/util";
import LoginUsernameBox from "~/components/login/LoginUsernameBox";
import LoginPasswordBox from "~/components/login/LoginPasswordBox";

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
        }

    }


    onSubmit = async () => {
        try {
            let { data } = await ajax.request("post", ajax.getRoute("login"), {
                username: this.state.username,
                password: this.state.passsord,
                rememberMe: this.state.checkedRM,
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }


    render() {
        return (
            <div style={styles.loginBox}>

                <LoginUsernameBox onChange={this.getChangeHandler("username")} />
                <br/>
                <LoginPasswordBox onChange={this.getChangeHandler("password")} />
                <br/>
                <LoginRememberMeBox onChange={this.getChangeHandler("checkedRM", "checked")} />
                <br/>


    			<Link style={styles.fpLink} location="/fp" text="Forgot password?" />
    		</div>
        )
    }
}
