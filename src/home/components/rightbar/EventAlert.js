import React from "react";
import Radium from "radium";

import LeftbarButton from "../leftbar/LeftbarButton";
import AttendanceModal from "~/calendar/components/middle/AttendanceModal";

import styles from "~/home/styles/leftbar";
import ajax from "~/util/ajax";
import { currentUser } from "~/util";
import { modalProps } from "~/util/modal";

@Radium
export default class EventAlert extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
    }

    renderAttendanceAlert = () => {
        if (currentUser.isAdmin()) {
            const attendanceAlerts = this.props.alerts.map(event => (
                <div key={event._id}>
                    <h3>Event Today</h3>

                    <p>The event, <span>{event.name}</span>
                        , has begun!</p>
                    <LeftbarButton
                        text="Click to take Attendance"
                        //onClick={() => this.setState({ isAttendanceModalOpen: true })}
                    />
                    {/*<AttendanceModal
                        { ...modalProps(this, "isAttendanceModalOpen") }
                        event={this.props.event}
                    />*/}
                </div>
            ))
            return (
            <div style= {styles.leftbar.alert}>
                {attendanceAlerts}
            </div>
            )
        }
    }

    render () {
        return (
            <div>
                {this.renderAttendanceAlert()}
            </div>
        )
    }

}
