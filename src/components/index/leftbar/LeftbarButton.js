import React from "react";
import Radium from "radium";

let styles = {
    button: {
        fontsize: "14px",
        ":hover": {
            backgroundColor: "#E9E9E9",
            cursor: "pointer",
        }
    }
}


@Radium
export default class LeftbarButton extends React.Component {

    static propTypes = {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func
    }

    render() {
        return (
            <p
                style={styles.button}
                onClick={this.props.onClick}
            >
                {this.props.text}
            </p>
        )
    }
}
