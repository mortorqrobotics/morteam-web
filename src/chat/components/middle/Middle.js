import React from "react";
import Radium from "radium";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styles from "~/chat/styles/middle";
import { connect } from "react-redux";

const Middle = (props) => {
    return (
        <div style={styles.container}>
            <MessageList chat={props.chat} />
            <MessageInput />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        chat: state.chats.find(chat => chat._id == state.currentChatId),
    }
}

export default connect(mapStateToProps)(Radium(Middle));
