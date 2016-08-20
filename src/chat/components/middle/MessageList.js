import React from "react";
import Radium from "radium";

import styles from "~/chat/styles/middle";
import MessageItem from "./MessageItem";

@Radium
export default class MessageList extends React.Component {

    render() {
        return (
            <div style={styles.messagesDiv}>
                {/*this.props.chat.messages.map(message => (
                    <MessageItem message={message} />
                ))*/}
            </div>
        )
    }

}
