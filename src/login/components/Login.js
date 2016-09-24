import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import TopBar from "./TopBar";
import IntroText from "./IntroText";
import LoginBox from "./LoginBox";
import styles from "~/login/styles";

@Radium
export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root pageName="login">
                <div style={[styles.container]}>
                    <TopBar />
                    <IntroText />
                    <LoginBox />
                </div>
            </Root>
        )
    }
}

pageInit(Login);
