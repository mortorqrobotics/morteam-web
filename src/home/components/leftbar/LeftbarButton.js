import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";

let styles = {
    button: {
        fontsize: "14px",
        ":hover": {
            backgroundColor: "#E9E9E9",
            cursor: "pointer",
        }
    },
    glyph: {
        marginRight: "5px"
    }
}


@Radium
export default class LeftbarButton extends React.Component {

    static propTypes = {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func,
        glyph: React.PropTypes.string,
    }

    displayGlyph = () => {
        if (this.props.glyph) {
            return (
                <Glyphicon glyph={this.props.glyph} style={styles.glyph} />
            )
        }
    }

    render() {
        return (
            <p
                style={styles.button}
                onClick={this.props.onClick}
            >
                {this.displayGlyph()}
                {this.props.text}
            </p>
        )
    }
}
