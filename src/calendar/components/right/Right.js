import React from "react";
import Radium from "radium";

import UpcomingEvents from "./UpcomingEvents";
import PendingTasks from "./PendingTasks";
import styles from "~/calendar/styles/right";

function Right(props) {
    return (
        <div style={styles.container}>
            <UpcomingEvents key="upcomingEvents" />
            <PendingTasks key="pendingTasks" />
        </div>
    )
}

export default Radium(Right);

