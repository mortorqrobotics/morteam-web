import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";

@Radium
export default class TeamButton extends React.Component {

    onClick() {
        window.location.assign("teams/current");
    }

    render() {
        return (
            <LeftbarButton text="Team" onClick={this.onClick} />
        )
    }
}
