import ajax from "~/util/ajax";

const addAnnouncementSync = (announcement) => ({
    type: "ADD_ANNOUNCEMENT",
    announcement: announcement,
})

export const addAnnouncement = (announcement) => {
    return (dispatch) => {
        return ajax.request("POST", "/announcements", announcement)
            .then(({ data }) => dispatch(addAnnouncementSync(data)))
    }
}

const setAnnouncements = (announcements) => ({
    type: "SET_ANNOUNCEMENTS",
    announcements: announcements,
})

export const fetchAnnouncements = () => {
    return (dispatch) => {
        return ajax.request("GET", "/announcements")
            .then(({ data }) => dispatch(setAnnouncements(data)))
    }
}

