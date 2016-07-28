import React from "react";
import Radium from "radium";

import TextBox from "~/components/shared/forms/TextBox";
import Row from "react-bootstrap/lib/Row";

import sharedStyles from "./sharedStyles";

const styles = {
    textBox: sharedStyles,
}

@Radium
export default class VoidTextBox extends React.Component {

    render() {
        return (
            <TextBox
                style={styles.textBox}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }
}
