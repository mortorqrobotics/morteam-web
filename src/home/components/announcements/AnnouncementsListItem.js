import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Tooltip from "react-bootstrap/lib/Tooltip";
import ProfilePicture from "~/shared/components/ProfilePicture";
import styles from "~/home/styles/announcements";
import { fullName, currentUser } from "~/util";
import { parseDate } from "~/util/date";
import { getGroupName } from "~/util/groups";
import { connect } from "react-redux";
import { deleteAnnouncement } from "~/home/actions";
import { sanitize } from "dompurify";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class AnnouncementsListItem extends React.Component {

    static propTypes = {
        announcement: React.PropTypes.object,
    }

    handleDelete = () => {
        if (window.confirm("Are you sure?")) {
            this.props.dispatch(deleteAnnouncement(this.props.announcement._id));
        }
    }

    renderDeleteButton = () => {
        if (currentUser.isAdmin()
            || currentUser._id == this.props.announcement.author._id) {
            return (
                <RadiumGlyphicon
                    glyph="remove"
                    style={styles.deleteIcon}
                    onClick={this.handleDelete}
                />
            )
        }
    }

    renderAudienceTooltip = () => {
        const { groups, users } = this.props.announcement.audience;
        // TODO: this looks meh
        return (
            <Tooltip id="announcement-audience">
                <span style={styles.audienceTooltip}>
                    {groups.map(getGroupName).concat(users.map(fullName)).join(", ")}
                </span>
            </Tooltip>
        )
    }

    render() {
        const announcement = this.props.announcement;
        return (
            <div style={styles.announcement}>
                <div style={styles.announcementTop}>
                    <div
                        style={{ display: "inline-block" }}
                        onClick={() => {
                            window.location.assign(
                                `/profiles/id/${announcement.author._id}`
                            );
                        }}
                    >
                        <ProfilePicture
                            user={announcement.author}
                            picSize="small"
                            frameSize={40}
                            style={{ cursor: "pointer" }}
                        />
                        <span
                            style={styles.author}
                        >
                            {fullName(announcement.author)}
                        </span>
                    </div>
                    <span style={styles.time}>
                        {" - " + parseDate(announcement.timestamp)}
                    </span>
                    <OverlayTrigger
                        placement="top"
                        overlay={this.renderAudienceTooltip()}
                    >
                        <RadiumGlyphicon glyph="globe" style={styles.globe} />
                    </OverlayTrigger>
                    {/*
                    TODO: show recipient list
                    {this.props.audience.groups.map(group => (
                        <p key={group._id}>
                            {group.name}
                        </p>
                    ))}
                    {this.props.audience.users.map(user => (
                        <p key={user._id}>
                            {user.firstname} {user.lastname}
                        </p>
                    ))}
                    */}
                    {this.renderDeleteButton()}
                </div>
                {/* TODO: prevent xss here */}
                <span dangerouslySetInnerHTML={{ __html: sanitize(announcement.content) }} />
            </div>
        )
    }

}

export default connect()(AnnouncementsListItem);
