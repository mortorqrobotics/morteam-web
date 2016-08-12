import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";
import MakeGroupModal from "./groupModal/MakeGroupModal";

@Radium
export default class MakeGroupButton extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func
    }

    render() {
        return (
            <LeftbarButton
                text="Make a Group"
                glyph="plus"
                onClick={this.props.onClick}
            />
        )
    }
}
