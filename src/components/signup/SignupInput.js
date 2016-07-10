import React from "react";

import TextBox from "../shared/TextBox.js";
import SignupStyles from "some location where the styles imports are";

export default class SignupInput extends React.Component {
    render() {
        return (
            <TextBox placeholder={self.props.placeholder} style={SignupStyles.input} />
        )
    }
}
