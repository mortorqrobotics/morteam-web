import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import Form from "~/shared/components/forms/Form";
import TextArea from "~/shared/components/forms/TextArea";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import { makeChangeHandlerFactory } from "~/util";
import styles from "~/chat/styles/middle";
import { sendMessage, startTyping, stopTyping } from "~/chat/actions";

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
        this.props.dispatch(sendMessage(this.state.content));
        this.setState({ content: "", });
    }

    // this is necessary because the input box is a textarea, not an input type="text"
    // so have to listen for enter keypress here
    handleKeyDown = (event) => {
        if (!event.shiftKey && event.which == 13) { // enter key
            event.preventDefault();
            this.handleSend();
        }
        if (this.state.content.length === 0) {
            this.props.dispatch(stopTyping());
        } else {
            this.props.dispatch(startTyping());
        }
    }

    render() {
        return (
            <div style={styles.inputDiv}>
                <Form onSubmit={this.handleSend}>
                    <TextArea
                        autoFocus
                        rows="1"
                        style={styles.inputTextArea}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.content}
                        onChange={this.getChangeHandler("content")}
                    />
                    <SubmitButton
                        style={styles.sendButton}
                        text="send"
                    />
                </Form>
            </div>
        )
    }

}

export default connect()(MessageInput);
