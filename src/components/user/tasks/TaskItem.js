import React from "react";
import Radium from "radium";

import styles from "~/styles/user/tasks";
import { showDate } from "~/util/date";

const TaskItem = Radium(({ task }) => {
    // TODO: show user who created the task
    // TODO: add complete button for pending tasks
    return (
        <li style={styles.taskItem}>
            {task.name}
            <span style={styles.dueDate}>
                {showDate(task.dueDate)}
            </span>
            <div style={styles.description}>
                {task.description}
            </div>
        </li>
    )
})

export default TaskItem;
