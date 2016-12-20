import React from "react";
import Radium from "radium";

import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Tooltip from "react-bootstrap/lib/Tooltip";
import ProfilePicture from "~/shared/components/ProfilePicture";
import { chatItem as styles } from "~/chat/styles/middle";
import { fullName, currentUser } from "~/util";
import { allowOnlyTags } from "~/util/component";
import { parseDate } from "~/util/date";

const filterMessage = (content) => (
    allowOnlyTags(["a", "br"], content.replace(/\n/g, "<br />"))
)

@Radium
export default class MessageItem extends React.Component {

    static propTypes = {
        message: React.PropTypes.object,
    }

    renderAuthorTooltip = () => {
        const message = this.props.message;
        return (
            <Tooltip id="message-author">
                <span style={styles.audienceTooltip}>
                    {fullName(message.author) + ", " + parseDate(message.timestamp)}
                </span>
            </Tooltip>
        )
    }

    render() {
        const message = this.props.message;
        if (message.author._id == currentUser._id) {
            return (
                <div style={styles.bubbleWrapper}>
                    <div
                        style={
                            message.isLoading ? styles.selfBubbleLoading : styles.selfBubble
                        }
                    >
                        <span dangerouslySetInnerHTML={{ __html: filterMessage(message.content) }} />
                        <div style={styles.selfTriangle} />
                    </div>
                </div>
            )
        } else {
            return (
                <div style={styles.bubbleWrapper}>
                    <div style={styles.otherBubble}>
                        <OverlayTrigger
                            placement="top"
                            overlay={this.renderAuthorTooltip()}
                        >
                            <ProfilePicture
                                user={message.author}
                                picSize="small"
                                frameSize={30}
                                style={styles.profPic}
                            />
                        </OverlayTrigger>
                        <p
                            style={styles.chatOpponent}
                            onClick={() => window.location.assign(`/profiles/id/${message.author._id}`)}
                            // TODO: make a user link component
                        >
                            {message.author.firstname} {message.author.lastname[0]}:
                        </p>
                        <span dangerouslySetInnerHTML={{ __html: filterMessage(message.content) }} />
                        <div style={styles.otherTriangle} />
                    </div>
                </div>
            )
        }
    }

}
