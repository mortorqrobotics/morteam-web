import React from "react";
import Radium from "radium";

@Radium
export default class MessageItem extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object,
    }

    render() {
        const message = this.props.message;
        if (message.author._id == this.context.user._id) {
            return <h1>{message.content}</h1>
        } else {
            return <h1>{message.content}</h1>
        }
    }
    
}
