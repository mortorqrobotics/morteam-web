import React from "react";
import Radium from "radium";

import TopBar from "./TopBar";
import IntroText from "./IntroText";
import LoginBox from "./LoginBox";

var styles = {
    globalDefaults: { //Import later
        "margin": "0",
        "padding": "0",
        "fontFamily": "'exo 2', sans-serif",
        "fontWeight": "200",
        "outline": "0"
    }
}

@Radium
export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div style={[styles.globalDefaults]}>
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
