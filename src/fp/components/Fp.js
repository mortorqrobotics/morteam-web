import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import Link from "~/shared/components/Link";
import TextBox from "~/shared/components/forms/TextBox";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import Form from "~/shared/components/forms/Form";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import Root, { pageInit } from "~/shared/components/Root";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import styles from "~/fp/styles";

@Radium
class Fp extends React.Component {
    
    getChangeHandler = makeChangeHandlerFactory(this);
    
    state = {
        email: "",
        username: "",
        errorMsg: "",
    }
    
    onSubmit = async() =>{
        try{    
            let {data} = await ajax.request("post", "/forgotPassword", {
                email: this.state.email, 
                username: this.state.username,
            });
            this.setState({
                errorMsg: "sucess",
            });
            setTimeout(() => window.location.assign("/"), REDIR_TIME);
            
        } catch ({ response: { data } }) {
            this.setState({
                errorMsg: data
            });
        }
        
    }
    render() {
        return (
            <Root pageName="fp">
                <Link location="login" text="Back to login" />
                <Form style={styles.form} onSubmit={this.onSubmit}>  
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
                    <ErrorMsg message={this.state.errorMsg} />
                </Form>
            </Root>
        )
    }

}

pageInit(Fp);
