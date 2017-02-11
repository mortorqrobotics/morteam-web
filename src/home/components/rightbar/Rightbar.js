import React from "react";
import Radium from "radium";

import EventAlert from "./EventAlert";
import { currentUser } from "~/util";
import styles from "~/home/styles/leftbar";

@Radium
export default class Rightbar extends React.Component {

    renderAttendanceAlert = () => {
        if (currentUser.isAdmin()) {
            return (
                <EventAlert />
            )

        }

    }

    render() {
        return (
            <div style={styles.leftbar.div}>
                {this.renderAttendanceAlert()}
            </div>

        )


    }
}
