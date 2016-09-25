import React from "react";
import Radium from "radium";

import Button from "~/shared/components/forms/Button";

import styles from "~/home/styles/groupModal";

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
