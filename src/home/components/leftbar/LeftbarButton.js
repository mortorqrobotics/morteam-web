import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";

import styles from "~/home/styles/leftbar";


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
                <Glyphicon glyph={this.props.glyph} style={styles.leftbarButton.glyph} />
            )
        }
    }

    render() {
        return (
            <p
                style={styles.leftbarButton.button}
                onClick={this.props.onClick}
            >
                {this.displayGlyph()}
                {this.props.text}
            </p>
        )
    }
}
