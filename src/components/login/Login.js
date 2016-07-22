import React from "react";

import TopBar from "./TopBar";
import IntroText from "./IntroText";
import LoginBox from "./LoginBox";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <TopBar />
                <IntroText />
                <LoginBox />
            </div>
        )
    }
}

import ReactDOM from "react-dom";
window.__pageInit = {
    React: React,
    ReactDOM: ReactDOM,
    Page: Login,
};
