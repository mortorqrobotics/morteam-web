import React from "react";
import Radium from "radium";

import styles from "~/styles/home/announcements";

@Radium
export default class AnnouncementsListItem extends React.Component {

    static propTypes = {
        author: React.PropTypes.object, // User object
        content: React.PropTypes.string,
        audience: React.PropTypes.object,
        timestamp: React.PropTypes.object, // Date object
    }

    render() {
        return (
            <div style={styles.announcement}>
                <div style={styles.announcementTop}>
                    <img
                        src={this.props.author.profpicpath + "-60"}
                        style={styles.image}
                    />
                    <span style={styles.author}>
                        {this.props.author.firstname + " "
                            + this.props.author.lastname}
                    </span>
                    <span style={styles.time}>
                        {" - " + this.props.timestamp.toLocaleString()}
                    </span>
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
                </div>
                <span dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </div>
        )
    }

}
