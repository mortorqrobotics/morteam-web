import { request } from "~/util/ajax";

export const addAnnouncement = (announcement) => async (dispatch) => {
    const { data } = await request("POST", "/announcements", announcement);
    dispatch({
        type: "ADD_ANNOUNCEMENT_SUCCESS",
        announcement: data,
    });
}

export const deleteAnnouncement = (announcementId) => async (dispatch) => {
    await request("DELETE", "/announcements/id/" + announcementId);
    dispatch({
        type: "DELETE_ANNOUNCEMENT_SUCCESS",
        announcementId,
    });
}

export const loadAnnouncements = () => async (dispatch, getState) => {
    dispatch({
        type: "LOAD_ANNOUNCEMENTS_START",
    });
    const skip = getState().announcements.length;
    const { data } = await request("GET", "/announcements", { skip });
    dispatch({
        type: "LOAD_ANNOUNCEMENTS_SUCCESS",
        announcements: data,
    });
}

export const loadGroups = () => async (dispatch) => {
    const { data: userGroups } = await request("GET", "/groups/normal");
    const { data: otherGroups } = await request("GET", "/groups/other");
    dispatch({
        type: "LOAD_GROUPS",
        userGroups,
        otherGroups,
    });
}

export const addGroup = (group) => async (dispatch) => {
    const { data } = await request("POST", "/groups/normal", group);
    dispatch({
        type: "ADD_GROUP",
        group: data,
    });
}

export const fetchEvents = () => async (dispatch) => {
    let todayEvents = [];
    let today = new Date();
    let { data } = await request("GET", "/events"
        + `/startYear/${today.getFullYear()}/startMonth/${today.getMonth()}`
        + `/endYear/${today.getFullYear()}/endMonth/${today.getMonth()}`
    );
    console.log(data);
    data = data.filter(event => new Date(event.date).getDate() == today.getDate());
    todayEvents = data.filter(event => event.hasTakenAttendance == false);
    dispatch({
        type: "FETCH_EVENTS_SUCCESS",
        events: todayEvents,
    });
}

export function initialActions(dispatch) {
    dispatch(loadAnnouncements());
    dispatch(loadGroups());
    dispatch(fetchEvents());
}
