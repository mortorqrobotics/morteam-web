import { prevAbsMonth, nextAbsMonth, currentAbsMonth } from "~/util/date";
import { currentUser } from "~/util";
import { request } from "~/util/ajax";

export const addEvent = (event) => async (dispatch) => {
    const { data } = await request("POST", "/events", event);
    dispatch({
        type: "ADD_EVENT_SUCCESS",
        event: data,
    });
}

// absolute month contains the month from 0..11 and year

export const setAbsMonth = ({ month, year }) => async (dispatch, getState) => {
    const state = getState().events;
    const absMonths = [
        prevAbsMonth({ month, year }),
        { month, year },
        nextAbsMonth({ month, year }),
    ].filter(({ month, year }) => (
        !(year in state) || !(month in state[year])
    ));
    let events = [];
    if (absMonths.length > 0) {
        const first = absMonths[0];
        const last = absMonths[absMonths.length - 1];
        const { data } = await request("GET", "/events"
            + `/startYear/${first.year}/startMonth/${first.month}`
            + `/endYear/${last.year}/endMonth/${last.month}`
        );
        events = data;
    }
    dispatch({
        type: "SET_ABS_MONTH_SUCCESS",
        month,
        year,
        events,
    });
}

export const startAttendance = (eventId) => async (dispatch) => {
    await request("POST", `/events/id/${eventId}/startAttendance`);
    dispatch({
        type: "START_ATTENDANCE_SUCCESS",
        eventId,
    });
}

async function loadPendingTasks(dispatch) {
    const { data } = await request("GET",
        `/users/id/${currentUser._id}/tasks/pending`
    );
    dispatch({
        type: "LOAD_PENDING_TASKS_SUCCESS",
        tasks: data,
    });
}

export async function initialActions(dispatch) {
    dispatch(setAbsMonth(currentAbsMonth()));
    loadPendingTasks(dispatch);
}
