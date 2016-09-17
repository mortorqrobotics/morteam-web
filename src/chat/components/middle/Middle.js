import React from "react";
import Radium from "radium";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styles from "~/chat/styles/middle";
import { connect } from "react-redux";

const Middle = (props) => {
    if (!props.anyChats) {
        return null;
    }
    return (
        <div style={styles.container}>
            <MessageList />
            <MessageInput />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anyChats: state.chats.length > 0,
    }
}

export default connect(mapStateToProps)(Radium(Middle));
