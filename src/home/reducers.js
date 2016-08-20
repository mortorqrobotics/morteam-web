import { combineReducers } from "redux";

const announcements = (state = [], action) => {
    switch (action.type) {
        case "ADD_ANNOUNCEMENT":
            return [action.announcement].concat(state)
        case "SET_ANNOUNCEMENTS":
            return action.announcements
        default:
            return state
    }
}

export default combineReducers({
    announcements,
})
