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
        const scrollHeight = this.$container.prop("scrollHeight");
        const heightDiffDiff = this.props.heightDiff - this.lastHeightDiff;
        const topMessageId = this.props.chat.messages[0]
            && this.props.chat.messages[0]._id;
        const bottomMessageId = this.props.chat.messages[0]
            && this.props.chat.messages[this.props.chat.messages.length - 1]._id;
        const isTyping = this.props.chat.isTyping;
        const offset = this.lastScrollHeight - this.lastScrollTop - height;
        const scrollHeightDiff = scrollHeight - this.lastScrollHeight;

        const setScroll = (num) => this.$container.scrollTop(num);

        const noChange = () => setScroll(this.lastScrollTop + heightDiffDiff);
        const jumpToBottom = () => setScroll(scrollHeight);
        const noChangeNewHeight = () => setScroll(
            this.lastScrollTop + scrollHeightDiff + heightDiffDiff
        );

        // point where it will stop scrolling all the way down
        const threshold = 200;

        // this a little more verbose than necessary, but it is easier
        if (topMessageId !== this.lastTopMessageId) {
            noChangeNewHeight();
        } else if (bottomMessageId !== this.lastBottomMessageId) {
            if (offset > threshold) {
                noChange();
            } else {
                jumpToBottom();
            }
        } else if (isTyping !== this.wasTyping) {
            if (offset > threshold) {
                noChange();
            } else {
                noChangeNewHeight();
            }
        } else {
            noChange();
        }

        // for preserving scrolling with the input box changing height
        this.lastHeightDiff = this.props.heightDiff;

        // for preserving scroll height when messages are loaded at the top
        // and not scrolling when the chat input changes height
        // and not scrolling due to the typing indicator
        this.lastTopMessageId = topMessageId;
        this.lastBottomMessageId = bottomMessageId;
        this.wasTyping = isTyping;

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
                {this.props.chat && this.props.chat.messages.map(message => (
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
