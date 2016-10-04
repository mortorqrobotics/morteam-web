import React from "react";
import Radium from "radium";

import { chatItem as styles } from "~/chat/styles/middle";

@Radium
export default class TypingIndicator extends React.Component {

    render() {
        return (
            <div style={styles.bubbleWrapper}>
                <div style={styles.otherBubble}>
                    ...
                </div>
            </div>
        )
    }
}
