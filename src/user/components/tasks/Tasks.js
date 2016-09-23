import React from "react";
import Radium from "radium";

import TaskList from "./TaskList";
import { connect } from "react-redux";
import styles from "~/user/styles/middle";

const Tasks = Radium(props => {
    return (
        <div style={styles.container}>
            <TaskList
                title="Pending"
                tasks={props.pending}
            />
            <TaskList
                title="Completed"
                tasks={props.completed}
            />
        </div>
    )
})

const mapStateToProps = ({ tasks }) => {
    return {
        pending: tasks.pending,
        completed: tasks.completed,
    }
}

export default connect(mapStateToProps)(Tasks);
