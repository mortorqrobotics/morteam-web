//import React from "react";

import TextBox from "~/components/shared/forms/TextBox";


let styles = {
    loginPasswordBox: {
        fontSize: "18px",
        width: "210px",
        height: "28px",
        padding: "3px",
        border: "none",
        marginBottom: "15px",
    }
}

@Radium
export default class LoginUsernameBox extends React.Component {

    static propTypes = {
        onChange: React.propTypes.func.isRequired
    }

    render() {
        return (
            <TextBox 
                onChange={this.props.onChange} 
                autocapitalize={false} 
                autocorrect={false} 
                placeholder="Password"
                style={styles.loginPasswordBox}
            />
        )
    }
}
