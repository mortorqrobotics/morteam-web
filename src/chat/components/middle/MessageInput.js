import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import Form from "~/shared/components/forms/Form";
import TextArea from "~/shared/components/forms/TextArea";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import { makeChangeHandlerFactory } from "~/util";
import styles from "~/chat/styles/middle";
import { sendMessage } from "~/chat/actions";

@Radium
class MessageInput extends React.Component {

    state = {
        content: "",
    }

    getChangeHandler = makeChangeHandlerFactory(this)

    handleSend = () => {
        if (this.state.content.length === 0) {
            return;
        }
        this.props.dispatch(sendMessage(this.state.content))
            .then(() => this.setState({ content: "", }))
    }

    // this is necessary because the input box is a textarea, not an input type="text"
    // so have to listen for enter keypress here
    handleKeyDown = (event) => {
        if (!event.shiftKey && event.which == 13) { // enter key
            event.preventDefault();
            this.handleSend();
        }
    }

    render() {
        return (
            <div style={styles.inputDiv}>
                <Form onSubmit={this.handleSend}>
                    <TextArea
                        rows="1"
                        style={styles.inputTextArea}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.content}
                        onChange={this.getChangeHandler("content")}
                    />
                    <SubmitButton
                        style={styles.sendButton}
                    />
                </Form>
            </div>
        )
    }

}

export default connect()(MessageInput);
