import React from "react";
import Radium from "radium";

import Button from "~/shared/components/forms/Button";
import styles from "~/user/styles/middle";
import { fullName, currentUser } from "~/util";
import { showDate } from "~/util/date";
import { markTaskCompleted } from "~/user/actions";
import { connect } from "react-redux";

const TaskItem = ({ task, dispatch }) => {
    return (
        <li style={styles.taskItem}>
            {task.name}
            <span style={styles.dueDate}>
                ({showDate(task.dueDate)}) assigned by {fullName(task.creator)}
            </span>
            <div style={styles.taskDescription}>
                {task.description}
            </div>
            {currentUser.isAdmin() && !task.completed && (
                <Button
                    style={styles.markCompleted}
                    text="Mark as Completed"
                    onClick={() => dispatch(markTaskCompleted(task._id))}
                />
            )}
        </li>
    )
};

export default connect()(Radium(TaskItem));
