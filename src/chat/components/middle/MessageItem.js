import React from "react";
import Radium from "radium";

import { chatItem as styles } from "~/chat/styles/middle";
import { fullName } from "~/util";

@Radium
export default class MessageItem extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object,
    }

    render() {
        const message = this.props.message;
        if (message.author._id == this.context.user._id) {
            return (
                <div style={styles.bubbleWrapper}>
                    <div style={styles.selfBubble}>
                        {message.content}
                        <div style={styles.selfTriangle} />
                    </div>
                </div>
            )
        } else {
            return (
                <div style={styles.bubbleWrapper}>
                    <div style={styles.otherBubble}>
                        <img
                            style={styles.profPic}
                            src={message.author.profpicpath}
                        />
                        <p
                            style={styles.chatOpponent}
                            onClick={() => window.location.assign(`/profiles/id/${message.author._id}`)}
                            // TODO: make a user link component
                        >
                            {fullName(message.author)}:
                        </p>
                        {message.content}
                        <div style={styles.otherTriangle} />
                    </div>
                </div>
            )
        }
    }
    
}
