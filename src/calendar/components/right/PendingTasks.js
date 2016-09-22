import React from "react";
import Radium from "radium";

import RightItem from "./RightItem";
import styles from "~/calendar/styles/right";
import { fullName } from "~/util";
import { showDate } from "~/util/date";
import { connect } from "react-redux";

function PendingTasks(props) {
    return (
        <RightItem
            title="Pending Tasks"
        >
            {props.tasks.map(task => (
                <li key={task._id} style={styles.li}>
                    {task.name} (By {showDate(task.dueDate)}) assigned by {fullName(task.creator)}
                    <br />
                    <div style={styles.indented}>
                        {task.description}
                    </div>
                </li>
            ))}
        </RightItem>
    )
}

function mapStateToProps(state) {
    return {
        tasks: state.pendingTasks,
    }
}

export default connect(mapStateToProps)(Radium(PendingTasks));
