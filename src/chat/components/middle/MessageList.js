import React from "react";
import Radium from "radium";

import styles from "~/chat/styles/middle";
import MessageItem from "./MessageItem";
import { fetchMessages } from "~/chat/actions";
import { connect } from "react-redux";

@Radium
class MessageList extends React.Component {

    static propTypes = {
        chat: React.PropTypes.object,
    }

    fetching = false;

    componentDidMount = () => {
        this.$container = $(this.refs.container);
        this.$container.scroll(this.handleScroll);
        this.$container.scrollTop(this.$container.prop("scrollHeight"));
    }

    componentWillUpdate = () => {
        this.lastScrollTop = this.$container.scrollTop();
        this.lastScrollHeight = this.$container.prop("scrollHeight");
    }

    // TODO: preserve scrolling when switching from chat to chat

    componentDidUpdate = () => {
        const scrollTop = this.$container.scrollTop();
        const scrollHeight = this.$container.prop("scrollHeight");
        this.$container.scrollTop(
            this.lastScrollTop + scrollHeight - this.lastScrollHeight
        );

        // without setTimeout, strange stuff happens
        // I think it checks the scrolling before updating or something
        setTimeout(this.handleScroll, 10);

        this.fetching = false;
    }

    handleScroll = () => {
        if (this.fetching) {
            return;
        }
        const scrollTop = this.$container.scrollTop();
        const height = this.$container.height();
        console.log(scrollTop, height)
        if (scrollTop < height / 2) {
            this.fetching = true;
            this.props.dispatch(fetchMessages());
        }
    }

    render() {
        const messages = this.props.chat ? this.props.chat.messages : [];
        return (
            <div ref="container" style={styles.messagesDiv}>
                {messages.map(message => (
                    <MessageItem
                        message={message}
                    />
                ))}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        chat: state.chats.find(chat => chat._id == state.currentChatId),
    }
}

export default connect(mapStateToProps)(Radium(MessageList));
