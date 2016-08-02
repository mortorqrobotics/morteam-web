import { combineReducers } from "redux";

const announcements = (state = [], action) => {
    switch (action.type) {
        case "ADD_ANNOUNCEMENT":
            return state.concat([action.announcement])
        default:
            return state
    }
}

export default combineReducers({
    announcements: announcements,
})
