import React from "react";
import Radium from "radium";

let styles = {
    title: {
        fontSize: "40px",
        marginBottom: "25px",
        fontWeight: "400",
        maxWidth: "800px",
    },
    text: {
        maxWidth: "800px",
        marginBottom: "85px",
    },
    h1: {
        paddingTop: "10px",
        fontSize: "50px",
    }
}

@Radium
export default class IntroTextItem extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
                <h1 style={[styles.title, styles.h1]}>{this.props.title}</h1>
                <h2 style={styles.text}>{this.props.text}</h2>
            </div>
        )
    }
}
