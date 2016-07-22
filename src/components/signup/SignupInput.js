import React from "react";
import Radium from "radium";

import TextBox from "~/components/shared/forms/TextBox.js";
//import signupStyles from "some location where the styles imports are";

let styles = {
    signup_item: {
        display: "block",
    },
    signup_item_not_make_team_question: {
        boxShadow: "1.5px 3px 8px -2px #BA7000",
        borderRadius: "0px",
    },
    signup_item_extended: {
        position: "relative",
        left: "50%",
        width: "300px",
        height: "40px",
        fontSize: "25px",
        marginLeft: "-150px",
        marginTop: "20px",
        border: "0",
        borderRadius: "5px",
        padding: "8px",
        ":focus": {
            outline: "none",
        },
    }
}

@Radium
export default class SignupInput extends React.Component {

    static propTypes = {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.string,
    }

    render() {
        return (
            <TextBox
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                style={[styles.signup_item, styles.signup_item_extended, styles.signup_item_not_make_team_question]}
            />
        )
    }
}
