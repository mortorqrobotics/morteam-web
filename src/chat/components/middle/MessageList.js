import React from "react";
import Radium from "radium";

import styles from "~/chat/styles/middle";
import MessageItem from "./MessageItem";
import InfiniteScroll from "react-infinite-scroller";
import { fetchMessages } from "~/chat/actions";
import { connect } from "react-redux";

@Radium
export default class MessageList extends React.Component {

    static propTypes = {
        chat: React.PropTypes.object,
    }

    render() {
        const messages = this.props.chat ? this.props.chat.messages : [];
        return (
            <div style={styles.messagesDiv}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.props.dispatch(fetchMessages())}
                    hasMore={true}
                    loader={<div>loading</div>}
                    useWindow={false}
                >
                    {messages.map(message => (
                        <MessageItem
                            key={Math.random()}
                            message={message}
                        />
                    ))}
                </InfiniteScroll>
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
