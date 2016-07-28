import React from "react";
import Radium from "radium";

import Button from "~/components/shared/forms/Button";

let styles = {
    button: {
        width: "91.5%",
        height: "37px",
        backgroundColor: "#ffc547",
        border: "none",
        color: "black",
        position: "absolute",
        bottom: "15px",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        borderRadius: "1px",
        ":hover": {
            backgroundColor: "orange",
        }
    }
}

@Radium
export default class CreateGroupButton extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func
    }

    render() {
        return (
            <Button
                text="Make Group"
                onClick={this.props.onClick}
                style={styles.button}
            />
        )
    }
}
