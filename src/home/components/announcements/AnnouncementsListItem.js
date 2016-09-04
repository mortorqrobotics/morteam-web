import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/home/styles/announcements";
import { fullName } from "~/util";
import { connect } from "react-redux";
import { deleteAnnouncement } from "~/home/actions";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class AnnouncementsListItem extends React.Component {

    static propTypes = {
        announcement: React.PropTypes.object,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    renderDeleteButton = () => {
        if (this.context.user.isAdmin()) {
            return (
                <RadiumGlyphicon
                    glyph="remove"
                    style={styles.deleteIcon}
                    onClick={() => {
                        this.props.dispatch(deleteAnnouncement(this.props.announcement._id))
                    }}
                />
            )
        }
    }

    render() {
        const announcement = this.props.announcement;
        return (
            <div style={styles.announcement}>
                <div style={styles.announcementTop}>
                    <img
                        src={announcement.author.profpicpath + "-60"}
                        style={styles.image}
                    />
                    <span style={styles.author}>
                        {fullName(announcement.author)}
                    </span>
                    <span style={styles.time}>
                        {" - " + announcement.timestamp.toLocaleString()}
                    </span>
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
                <span dangerouslySetInnerHTML={{ __html: announcement.content }} />
            </div>
        )
    }

}

export default connect()(AnnouncementsListItem);
