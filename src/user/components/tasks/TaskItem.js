import React from "react";
import Radium from "radium";

import Button from "~/shared/components/forms/Button";
import styles from "~/user/styles/tasks";
import { fullName } from "~/util";
import { showDate } from "~/util/date";
import { markTaskCompleted } from "~/user/actions";
import { connect } from "react-redux";

const TaskItem = ({ task, dispatch }, context) => {
    return (
        <li style={styles.taskItem}>
            {task.name}
            <span style={styles.dueDate}>
                ({showDate(task.dueDate)}) assigned by {fullName(task.creator)}
            </span>
            <div style={styles.description}>
                {task.description}
            </div>
            {context.user.isAdmin() && !task.completed && (
                <Button
                    style={styles.markCompleted}
                    text="Mark as Completed"
                    onClick={() => dispatch(markTaskCompleted(task._id))}
                />
            )}
        </li>
    )
};

TaskItem.contextTypes = {
    user: React.PropTypes.object,
}

export default connect()(Radium(TaskItem));
