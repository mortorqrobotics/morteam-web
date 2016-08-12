import React from "react";
import Radium from "radium";

import { LeftbarContainer, LeftbarItem, LeftbarButton } from "~/shared/components/leftbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ComposeModal from "./ComposeModal";
import { connect } from "react-redux";
import { fullName, otherUser } from "~/util";
import styles from "~/chat/styles/leftbar";

@Radium
class Leftbar extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object,
    }

    state = {
        isComposeModalOpen: false,
    }

    chatTitle = (chat) => {
        if (chat.isTwoPeople) {
            return fullName(otherUser(chat.audience.users, this.context.user._id))
        } else {
            return chat.name
        }
    }

    chatSymbol = (chat) => {
        const src = chat.isTwoPeople
            ? otherUser(chat.audience.users, this.context.user._id).profpicpath
            : "/images/group.png"
        return (
            <img
                src={src}
                style={styles.img}
            />
        )
    }

    render() {
        return (
            <LeftbarContainer>
                <LeftbarButton
                    onClick={() => this.setState({ isComposeModalOpen: true })}
                >
                    <Glyphicon glyph="pencil" style={{ marginRight: "5px" }} />
                    Compose
                </LeftbarButton>
                <LeftbarItem>
                    search here
                </LeftbarItem>
                {this.props.chats.map(chat => (
                    <LeftbarButton key={chat._id}>
                        {this.chatSymbol(chat)}
                        {this.chatTitle(chat)}
                    </LeftbarButton>
                ))}
                <ComposeModal
                    isOpen={this.state.isComposeModalOpen}
                    onAfterOpen={() => this.setState({ isComposeModalOpen: true })}
                    onRequestClose={() => this.setState({ isComposeModalOpen: false })}
                />
            </LeftbarContainer>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        chats: state.chats,
    }
}

export default connect(mapStateToProps)(Leftbar);
