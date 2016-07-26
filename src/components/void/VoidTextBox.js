import React from "react";
import Radium from "radium";

import TextBox from "~/components/shared/forms/TextBox";

@Radium
export default class VoidTextBox extends React.Component {

    render() {
        return (
            <TextBox
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }
}
