import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import TopBar from "./TopBar";
import IntroText from "./IntroText";
import LoginBox from "./LoginBox";

var styles = {
    div: {
        "backgroundColor": "#fff",
        "color": "black"
    }
}

@Radium
export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root pageName="login">
                <div style={[styles.div]}>
                    <TopBar />
                    <IntroText />
                    <LoginBox />
                </div>
            </Root>
        )
    }
}

pageInit(Login);
