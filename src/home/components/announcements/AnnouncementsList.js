import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import AnnouncementsListItem from "./AnnouncementsListItem";
import { connect } from "react-redux";
import styles from "~/home/styles/announcements";
import { loadAnnouncements } from "~/home/actions";

@Radium
class AnnouncementsList extends React.Component {

    componentDidMount = () => {
        $(document).scroll(() => {
            if (this.props.isLoading) {
                return;
            }
            const scrollTop = $(document).scrollTop();
            const height = $(document).height();
            const clientHeight = document.body.clientHeight;
            if (height - clientHeight - scrollTop < 200) {
                this.props.dispatch(loadAnnouncements());
            }
        });
    }

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
        isLoading: state.announcementsLoading,
    }
}

export default connect(mapStateToProps)(AnnouncementsList);
