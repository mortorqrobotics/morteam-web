import React from "react";
import Radium from "radium";

import TaskItem from "./TaskItem";
import styles from "~/user/styles/middle";

const TaskList = Radium(({ title, tasks }) => {
    return (
        <div>
            <span style={styles.title}>{title}</span>
            <ul style={styles.taskList}>
                {tasks.map(task => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </ul>
        </div>
    )
})

export default TaskList;
