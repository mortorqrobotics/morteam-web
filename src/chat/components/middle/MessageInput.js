import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import Form from "~/shared/components/forms/Form";
import TextArea from "~/shared/components/forms/TextArea";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import styles from "~/chat/styles/middle";
import { sendMessage, startTyping, stopTyping } from "~/chat/actions";

@Radium
class MessageInput extends React.Component {

    state = {
        content: "",
    }

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
    }

    handleChange = (event) => {
        this.setState({ content: event.target.value });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.dispatch(stopTyping());
        }, 2000);
        this.props.dispatch(startTyping());
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
                        onChange={this.handleChange}
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
