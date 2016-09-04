import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import AnnouncementsListItem from "./AnnouncementsListItem";
import { connect } from "react-redux";
import styles from "~/home/styles/announcements";

@Radium
class AnnouncementsList extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                {this.props.announcements.map(announcement => (
                    <AnnouncementsListItem 
                        key={announcement._id}
                        announcement={announcement}
                    />
                ))}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        announcements: state.announcements,
    }
}

export default connect(mapStateToProps)(AnnouncementsList);
