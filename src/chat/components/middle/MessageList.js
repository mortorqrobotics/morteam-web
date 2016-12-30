import React from "react";
import Radium from "radium";

import styles from "~/chat/styles/middle";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator.js";
import { loadMessages } from "~/chat/actions";
import { connect } from "react-redux";

@Radium
class MessageList extends React.Component {

    static propTypes = {
        chat: React.PropTypes.object,
    }

    loading = false;

    componentDidMount = () => {
        this.$container = $(this.refs.container);
        this.$container.scroll(this.handleScroll);
        this.$container.scrollTop(this.$container.prop("scrollHeight"));
        this.loading = true;
        this.lastHeightDiff = 0;
        this.props.dispatch(loadMessages());
    }

    componentWillUpdate = () => {
        this.lastScrollTop = this.$container.scrollTop();
        this.lastScrollHeight = this.$container.prop("scrollHeight");
    }

    // TODO: preserve scrolling when switching from chat to chat

    componentDidUpdate = () => {

        const height = this.$container.height();

        const offset = this.lastScrollHeight - this.lastScrollTop - height;

        // point where it will stop scrolling all the way down
        const threshold = 200;

        if (offset > threshold) {

            const heightDiffDiff = this.props.heightDiff - this.lastHeightDiff;
            this.$container.scrollTop(this.lastScrollTop + heightDiffDiff);

        } else {

            const scrollHeight = this.$container.prop("scrollHeight");
            this.$container.scrollTop(scrollHeight);

        }

        // for preserving scrolling with the input box changing height
        this.lastHeightDiff = this.props.heightDiff;

        if (!this.props.chat.areAllMessagesLoaded) {
            // without setTimeout, strange stuff happens
            // I think it checks the scrolling before updating or something
            setTimeout(this.handleScroll, 10);
        }

        this.loading = false;
    }

    // TODO: cancel this handler on unmount
    handleScroll = () => {
        if (this.loading) {
            return;
        }
        const scrollTop = this.$container.scrollTop();
        const height = this.$container.height();
        if (scrollTop < height / 2) {
            this.loading = true;
            this.props.dispatch(loadMessages());
        }
    }

    render() {
        return (
            <div
                ref="container"
                style={[
                    styles.messagesDiv,
                    { height: "calc(100% - " + (50 + this.props.heightDiff) + "px)" },
                ]}
            >
                {this.props.chat.messages.map(message => (
                    <MessageItem
                        message={message}
                        key={message._id}
                    />
                ))}
                <TypingIndicator
                    key="typing-thing"
                    isVisible={this.props.chat.isTyping}
                    wasVisible={this.props.chat.wasTyping}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        chat: state.chats.find(chat => chat._id == state.currentChatId),
        heightDiff: state.inputSize.heightDiff,
    }
}

export default connect(mapStateToProps)(Radium(MessageList));
