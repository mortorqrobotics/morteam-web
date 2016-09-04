import { combineReducers } from "redux";

const announcements = (state = [], action) => {
    switch (action.type) {
        case "ADD_ANNOUNCEMENT":
            return [action.announcement].concat(state)
        case "SET_ANNOUNCEMENTS":
            return action.announcements
        case "DELETE_ANNOUNCEMENT":
            return state.filter(announcement => (
                announcement._id != action.announcementId
            ))
        default:
            return state
    }
}

export default combineReducers({
    announcements,
})
