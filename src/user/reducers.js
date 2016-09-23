import { combineReducers } from "redux";

const initialState = {
    pending: [],
    completed: [],
}

const tasks = (state = initialState, action) => {
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

export default combineReducers({
    tasks,
})
