import React from "react";
import ReactDOM from "react-dom";
import { StyleRoot } from "radium";

let globalStyle = {
    // TODO: add stuff here
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
