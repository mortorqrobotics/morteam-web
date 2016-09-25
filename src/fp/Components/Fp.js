import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";
import Link from "~/shared/components/Link";
import TextBox from "~/shared/components/forms/TextBox";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import Form from "~/shared/components/forms/Button";

import Root, { pageInit } from "~/shared/components/Root";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";

import styles from "~/fp/styles";

@Radium
class Fp extends React.Component {
    
    getChangeHandler = makeChangeHandlerFactory(this);
    
    state = {
        email: "",
        username: "",
    }
    
    render() {
        return (
            <Root pageName="fp">
                <Link location="login" text="Back to login" />
                <Form style={styles.form}>  
                    <TextBox 
                        placeholder="Email"
                        style={styles.textBox}
                        value={this.state.email}
                        onChange={this.getChangeHandler("email")}
                        autoFocus
                    />
                    <TextBox 
                        placeholder="Username"
                        style={styles.textBox}
                        value={this.state.Username}
                        onChange={this.getChangeHandler("username")}
                    />
                    <SubmitButton
                        styles={styles.button}
                        text="OK"
                    />
                </Form>
            </Root>
        )
    }

}

pageInit(Fp);
