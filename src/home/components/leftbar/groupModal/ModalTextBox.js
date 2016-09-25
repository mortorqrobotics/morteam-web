import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";

import styles from "~/home/styles/groupModal";

@Radium
export default class ModalTextBox extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string
    }

    render() {
        return (
            <TextBox
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                value={this.props.value}
                style={styles.textBox}
                maxLength={21}
            />
        )
    }
}
