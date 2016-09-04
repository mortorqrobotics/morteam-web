export function addAnnouncement(announcement) {
    return {
        type: "ADD_ANNOUNCEMENT",
        announcement,
    }
}

export function deleteAnnouncement(announcementId) {
    return {
        type: "DELETE_ANNOUNCEMENT",
        announcementId,
    }
}

