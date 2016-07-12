//import React from "react";

import TextBox from "../shared/forms/TextBox.js";
//import signupStyles from "some location where the styles imports are";

export default class SignupInput extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
    }

    render() {
        return (
            <TextBox
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                // style={SignupStyles.input} />
            />
        )
    }
}
