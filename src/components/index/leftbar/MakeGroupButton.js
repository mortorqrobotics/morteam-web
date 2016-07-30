import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";
import MakeGroupModal from "./groupModal/MakeGroupModal";

@Radium
export default class MakeGroupButton extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    render() {
        return (
            <LeftbarButton text="Make a Group" onClick={this.props.onClick} />
        )
    }
}
