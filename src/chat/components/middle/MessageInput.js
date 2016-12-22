import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import Form from "~/shared/components/forms/Form";
import TextArea from "~/shared/components/forms/TextArea";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import styles from "~/chat/styles/middle";
import {
    sendMessage,
    startTyping,
    stopTyping,
    setInputSize,
} from "~/chat/actions";

const maxRowsShown = 12;

@Radium
class MessageInput extends React.Component {

    initialState = {
        content: "",
        numRows: 1,
    }
    state = this.initialState;

    componentDidMount = () => {
        this.originalHeight = $("#chat-input")[0].scrollHeight;
    }

    handleSend = () => {
        if (this.state.content.length === 0) {
            return;
        }
        this.props.dispatch(sendMessage(this.state.content));
        this.setState(this.initialState);
        this.props.dispatch(setInputSize(0));
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

        // without this line, if it expands to a certain number of lines it
        // will never go down to fewer lines; not sure why but this works
        event.target.style.height = 0;

        const currentHeight = event.target.scrollHeight;
        const heightDiff = currentHeight - this.originalHeight;
        const rowHeight = parseInt($(event.target).css("lineHeight"));
        const numRows = heightDiff / rowHeight + 1;

        this.setState({
            content: event.target.value,
            numRows: numRows,
        });

        this.props.dispatch(setInputSize(Math.min(
            heightDiff,
            maxRowsShown * rowHeight - $(event.target).outerHeight()
        )));

        // this undoes what is done at the beginning of this function
        event.target.style.height = "";

        const typingTimeout = 2000;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.dispatch(stopTyping());
        }, typingTimeout);
        this.props.dispatch(startTyping());

    }

    render() {
        return (
            <div style={styles.inputDiv}>
                <Form onSubmit={this.handleSend}>
                    <TextArea
                        autoFocus
                        id="chat-input"
                        rows={this.state.numRows}
                        style={[
                            styles.inputTextArea,
                            this.state.numRows > maxRowsShown ? { overflowY: "scroll", overflowX: "hidden" } : {},
                        ]}
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
