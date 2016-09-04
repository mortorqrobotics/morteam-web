import ajax from "~/util/ajax";

function addAnnouncementSync(announcement) {
    return {
        type: "ADD_ANNOUNCEMENT",
        announcement,
    }
}

export function addAnnouncement(announcement) {
    return (dispatch) => {
        return ajax.request("POST", "/announcements", announcement)
            .then(({ data }) => dispatch(addAnnouncementSync(data)))
    }
}

function setAnnouncements(announcements) {
    return {
        type: "SET_ANNOUNCEMENTS",
        announcements,
    }
}

export function fetchAnnouncements() {
    return (dispatch) => {
        return ajax.request("GET", "/announcements")
            .then(({ data }) => dispatch(setAnnouncements(data)))
    }
}

function deleteAnnouncementSync(announcementId) {
    return {
        type: "DELETE_ANNOUNCEMENT",
        announcementId,
    }
}

export function deleteAnnouncement(announcementId) {
    return (dispatch) => {
        // TODO: get rid of the window.confirm!!!
        // also confirm blocks the main loop; is it bad to put it here?
        if (window.confirm("Are you sure?")) {
            return ajax.request("DELETE", "/announcements/id/" + announcementId)
                .then(() => dispatch(deleteAnnouncementSync(announcementId)))
        }
    }
}
