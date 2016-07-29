import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";
import userInfo from "~/util/userInfo";

@Radium
export default class ProfileButton extends React.Component {

    onClick() {
        window.location.assign("/profiles/id/" + userInfo._id);
    }

    render() {
        return (
            <LeftbarButton text="View Profile" onClick={this.onClick} />
        )
    }
}
