import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";

@Radium
export default class ProfileButton extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object,
    }

    onClick = () => {
        window.location.assign("/profiles/id/" + this.context.user._id);
    }

    render() {
        return (
            <LeftbarButton text="View Profile" onClick={this.onClick} />
        )
    }
}
