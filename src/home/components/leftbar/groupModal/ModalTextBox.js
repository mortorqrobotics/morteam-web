import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";

let styles = {
    textBox: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "10px",
        border: "none",
        padding: "8px 4px",
        fontSize: "15px",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        borderRadius: "1px",
    }
}

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
