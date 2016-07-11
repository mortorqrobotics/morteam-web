//import React from "react";

import TextBox from "../shared/forms/TextBox.js";
//import signupStyles from "some location where the styles imports are";

export default class SignupInput extends React.Component {
    render() {
        return (
            <TextBox placeholder={this.props.placeholder} /> // style={SignupStyles.input} />
        )
    }
}
