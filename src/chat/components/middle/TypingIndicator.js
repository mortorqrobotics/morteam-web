import React from "react";
import Radium from "radium";

import { chatItem as styles } from "~/chat/styles/middle";

@Radium
export default class TypingIndicator extends React.Component {

    static propTypes = {
        isVisible: React.PropTypes.bool,
    }

    render() {
        return (
            <div style={[
                styles.bubbleWrapper,
                this.props.isVisible ? {} : { visibility: "hidden" },
            ]}>
                <div style={styles.otherBubble}>
                    ...
                </div>
            </div>
        )
    }
}
