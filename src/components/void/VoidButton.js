import React from "react";
import Radium from "radium";

import Button from "~/components/shared/forms/Button";

import sharedStyles from "./sharedStyles";

const styles = {
    button: [sharedStyles, {
        backgroundColor: "#ffc547",
        borderRadius: "1px",
        cursor: "pointer",
    }],
}

@Radium
export default class VoidButton extends React.Component {

    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
    }

    render() {
        return (
            <Button
                text={this.props.text}
                onClick={this.props.onClick}
                style={styles.button}
            />
        )
    }
}
