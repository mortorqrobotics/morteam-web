import React from "react";
import Radium from "radium";

import styles from "~/home/styles/leftbar";
import LeftbarButton from "../leftbar/LeftbarButton";
import ajax from "~/util/ajax";
import { currentUser } from "~/util";

@Radium
export default class EventAlert extends React.Component {

    state = {
        events: [],
    }

    componentDidMount = async () => {
        await this.getRecentEvents();
    }

    getRecentEvents = async () => {
        let todayEvents = [];
        let today = new Date();
        let { data } = await ajax.request("GET", "/events"
            + `/startYear/${today.getFullYear()}/startMonth/${today.getMonth()}`
            + `/endYear/${today.getFullYear()}/endMonth/${today.getMonth()}`
        );
        data = data.filter(event => new Date(event.date).getDate() == today.getDate());
        todayEvents = data.filter(event => event.hasTakenAttendance == false);
        console.log(todayEvents.length);
        this.setState({
            events: todayEvents,
        });
    }

    renderAttendanceAlert = () => {
        if (currentUser.isAdmin() && this.state.events.length > 0) {
            const attendanceAlerts = this.state.events.map(event => (
                <div key={event._id}>
                    <h3>Event Today</h3>
                    <p>The event, <span>{event.name}</span>
                        , has begun!</p>
                    <LeftbarButton
                        text="Click to take Attendance"
                    />
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
