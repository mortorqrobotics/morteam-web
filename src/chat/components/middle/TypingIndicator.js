import React from "react";
import Radium from "radium";

import { chatItem as styles } from "~/chat/styles/middle";

@Radium
export default class TypingIndicator extends React.Component {

    static propTypes = {
        isVisible: React.PropTypes.bool,
        wasVisible: React.PropTypes.bool,
    }

    render() {
        if (!this.props.isVisible && !this.props.wasVisible) {
            return null;
        }
        return (
            <div style={[
                styles.bubbleWrapper,
                this.props.isVisible ? {} : { visibility: "hidden" },
            ]}>
                <div style={styles.otherBubble}>
                    ...
                    <div style={styles.otherTriangle} />
                </div>
            </div>
        )
    }
}
