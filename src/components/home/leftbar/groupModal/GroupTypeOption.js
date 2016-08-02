import React from "react";
import Radium from "radium";

let styles = {
    button: {
        display: "inline-block",
        marginTop: "5px",
        padding: "0px 4px",
        marginRight: "4px",
        cursor: "pointer",
        color: "#333",
    },
    selected: {
        backgroundColor: "orange"
    },
    unselected: {
        backgroundColor: "#ffcc80"
    }
}

@Radium
export default class GroupTypeOption extends React.Component {

    static propTypes = {
        isSelected: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        text: React.PropTypes.string
    }

    getStyle() {
        if (this.props.isSelected) {
            return styles.selected;
        }
        return styles.unselected;
    }

    render() {
        return (
            <p
                onClick={this.props.onClick}
                style={[styles.button, this.getStyle()]}
            >
                {this.props.text}
            </p>
        )
    }
}
