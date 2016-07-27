import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";

@Radium
export default class ProfileButton extends React.Component {

    onClick() {
        window.location.assign("/profiles/id/" + window.__userInfo._id);
    }

    render() {
        return (
            <LeftbarButton text="View Profile" onClick={this.onClick} />
        )
    }
}
