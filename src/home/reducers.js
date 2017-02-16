import update from "react/lib/update";

const announcements = (state = [], action) => {
    switch (action.type) {
        case "ADD_ANNOUNCEMENT_SUCCESS":
            return [action.announcement].concat(state)
        case "LOAD_ANNOUNCEMENTS_SUCCESS":
            return state.concat(action.announcements)
        case "DELETE_ANNOUNCEMENT_SUCCESS":
            return state.filter(announcement => (
                announcement._id != action.announcementId
            ))
        default:
            return state
    }
}

const announcementsLoading = (state = false, action) => {
    switch (action.type) {
        case "LOAD_ANNOUNCEMENTS_START":
            return true
        case "LOAD_ANNOUNCEMENTS_SUCCESS":
            return false
        default:
            return state
    }
}

const initialGroups = { user: [], other: [] };
const groups = (state = initialGroups, action) => {
    switch (action.type) {
        case "LOAD_GROUPS":
            return {
                user: action.userGroups,
                other: action.otherGroups,
            }
        case "ADD_GROUP":
            return update(state, {
                user: {
                    $push: [action.group]
                }
            })
        default:
            return state
    }
}

const initialAlerts = [];
const alerts = (state = initialAlerts, action) => {
    switch (action.type) {
        case "FETCH_EVENTS_SUCCESS":
            return action.events;
        default:
            return state
    }
}

export default {
    announcements,
    announcementsLoading,
    groups,
    alerts,
}
