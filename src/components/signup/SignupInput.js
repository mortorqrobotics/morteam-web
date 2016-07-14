//import React from "react";

import TextBox from "../shared/forms/TextBox.js";
//import signupStyles from "some location where the styles imports are";

var styles = cssInJS({
    "signup_item": {
        "display": "block"
    }
});

export default class SignupInput extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.string
    }

    render() {
        return (
            <TextBox
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                className={styles.signup_item}
            />
        )
    }
}
