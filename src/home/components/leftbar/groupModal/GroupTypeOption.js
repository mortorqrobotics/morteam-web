import React from "react";
import Radium from "radium";

import styles from "~/home/styles/groupModal";

@Radium
export default class GroupTypeOption extends React.Component {

    static propTypes = {
        isSelected: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        text: React.PropTypes.string
    }

    getStyle() {
        if (this.props.isSelected) {
            return styles.groupTypeOption.selected;
        }
        return styles.groupTypeOption.unselected;
    }

    render() {
        return (
            <p
                onClick={this.props.onClick}
                style={[styles.groupTypeOption.button, this.getStyle()]}
            >
                {this.props.text}
            </p>
        )
    }
}
