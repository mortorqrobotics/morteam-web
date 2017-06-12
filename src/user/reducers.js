const tasksInitialState = {
    pending: [],
    completed: [],
}

const tasks = (state = tasksInitialState, action) => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                pending: action.pending,
                completed: action.completed,
            }
        case "ADD_TASK":
            return {
                pending: [action.task].concat(state.pending),
                completed: state.completed,
            }
        case "MARK_TASK_COMPLETED":
            return {
                pending: state.pending.filter(task => task._id != action.taskId),
                completed: state.completed.concat({
                    ...state.pending.find(task => task._id == action.taskId),
                    completed: true,
                })
            }
        default:
            return state
    }
}

const attendanceInitialState = {
    absences: [],
    present: 0,
}

const attendance = (state = attendanceInitialState, action) => {
    switch (action.type) {
        case "FETCH_ATTENDANCE":
            return {
                absences: action.absences,
                present: action.present,
            }
        case "EXCUSE_ABSENCE":
            return {
                absences: state.absences.filter(absence => absence._id != action.absenceId),
            }
        default:
            return state
    }
}

export default {
    tasks,
    attendance,
}
