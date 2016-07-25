import React from "react";
import ReactDOM from "react-dom";
import { StyleRoot } from "radium";

let globalStyle = {
    margin: "0",
    padding: "0",
    fontFamily: "'exo 2', sans-serif",
    fontWeight: "200",
    outline: "0",
}

export default class Root extends React.Component {

    render() {
        return (
            <StyleRoot style={{globalStyle}}>
                {this.props.children}
            </StyleRoot>
        )
    }

}

window.__pageInit = {
    React: React,
    ReactDOM: ReactDOM,
}
