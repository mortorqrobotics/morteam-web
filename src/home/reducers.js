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
            state.user = state.user.concat(action.group);
            return state;
        default:
            return state
    }
}

export default {
    announcements,
    announcementsLoading,
    groups,
}
