import React from "react";
import Radium from "radium";

let styles = {
    button: {
        margin: "2px 4px 2px 4px",
        display: "inline-block",
        padding: "2px 3px 2px 3px",
        boxShadow: "1.5px 2px 8px -2px #a9a9a9",
        borderRadius: "1px",
        cursor: "pointer",
    },
    selected: {
        backgroundColor: "#53CF29",
    },
    user: {
        backgroundColor: "#ffd16e",
        ":hover": {
            backgroundColor: "orange"
        }
    },
    group: {
        backgroundColor: "#FFBC59",
        ":hover": {
            backgroundColor: "orange"
        }
    }
}

@Radium
export default class AudienceItem extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        isSelected: React.PropTypes.bool,
        id: React.PropTypes.string,
        text: React.PropTypes.string,
        isGroup: React.PropTypes.bool,
    }

    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    getStyle() {
        if (this.props.isSelected) {
            return styles.selected;
        }
        return this.props.isGroup ? styles.group : styles.user;
    }

    render() {
        return (
            <p
                style={[styles.button, this.getStyle()]}
                onClick={() => this.props.onClick(this.props.id)}
            >
                {this.props.text}
            </p>
        )
    }
}
