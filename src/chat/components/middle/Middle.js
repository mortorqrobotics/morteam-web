import React from "react";
import Radium from "radium";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styles from "~/chat/styles/middle";

const Middle = (props) => {
    return (
        <div style={styles.container}>
            <MessageList chat={props.chat} />
            <MessageInput />
        </div>
    )
}

export default Radium(Middle);
