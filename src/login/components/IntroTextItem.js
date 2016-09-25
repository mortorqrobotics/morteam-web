import React from "react";
import Radium from "radium";

import styles from "~login/styles";

@Radium
export default class IntroTextItem extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
                <h1 style={[styles.textArea.title, styles.h1]}>{this.props.title}</h1>
                <h2 style={styles.textArea.text}>{this.props.text}</h2>
            </div>
        )
    }
}
