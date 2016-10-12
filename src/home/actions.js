export function addAnnouncement(announcement) {
    return {
        type: "ADD_ANNOUNCEMENT",
        payload: announcement,
    }
}

export function deleteAnnouncement(announcementId) {
    return {
        type: "DELETE_ANNOUNCEMENT",
        payload: announcementId,
    }
}

export function loadAnnouncements() {
    return {
        type: "LOAD_ANNOUNCEMENTS",
    }
}
