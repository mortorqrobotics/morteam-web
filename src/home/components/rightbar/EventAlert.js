import React from "react";
import Radium from "radium";

import styles from "~/home/styles/leftbar";
import LeftbarButton from "../leftbar/LeftbarButton";

@Radium
export default class EventAlert extends React.Component {

    render () {
        return (
            <div style= {styles.leftbar.alert}>
                <h3>Alert!</h3>
                <p style={styles.leftbar.p}>The event,
                    <span>TestEvent</span> has begun!
                </p>
                <LeftbarButton
                    text="Take Attendance"
                />

            </div>

        )
    }

}
