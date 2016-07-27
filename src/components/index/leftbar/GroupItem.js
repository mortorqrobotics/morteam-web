import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";

@Radium
export default class GroupItem extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,
        id: React.PropTypes.string,
    }

    onClick = () => {
        window.location.assign("/groups/id/" + this.props.id);
    }

    render() {
        return (
            <LeftbarButton text={this.props.name} onClick={this.onClick} />
        )
    }
}
