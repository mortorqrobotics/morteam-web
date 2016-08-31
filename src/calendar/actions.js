import ajax from "~/util/ajax";
import { prevAbsMonth, nextAbsMonth } from "~/util/date";

function addEventSync(event) {
    return {
        type: "ADD_EVENT",
        event,
    }
}

export function addEvent(event) {
    return (dispatch) => {
        return ajax.request("POST", "/events", event)
            .then(({ data }) => dispatch(addEventSync(data)))
    }
}

// absolute month contains the month from 0..11 and year

function setAbsMonthSync({ month, year }, events) {
    return {
        type: "SET_ABS_MONTH",
        month,
        year,
        events,
    }
}

export function setAbsMonth({ month, year }) {
    return (dispatch, getState) => {
        const state = getState();
        const absMonths = [
            prevAbsMonth({ month, year }),
            { month, year },
            nextAbsMonth({ month, year }),
        ].filter(({ month, year }) => !(year in state) || !(month in state[year]));
        if (absMonths.length === 0) {
            return dispatch(setAbsMonthSync({ month, year }, []));
        } else {
            const first = absMonths[0];
            const last = absMonths[absMonths.length - 1];
            return ajax.request("GET", "/events"
                + "/startYear/" + first.year + "/startMonth/" + first.month
                + "/endYear/" + last.year + "/endMonth/" + last.month
            ).then(({ data }) => dispatch(setAbsMonthSync({ month, year }, data)));
        }
    }
}

function setPendingTasksSync(tasks) {
    return {
        type: "SET_PENDING_TASKS",
        tasks,
    }
}

export function fetchPendingTasks() {
    return (dispatch) => {
        return ajax.request("GET", "/users/id/" + window.__userInfo._id + "/tasks/pending")
            .then(({ data }) => dispatch(setPendingTasksSync(data)))
    }
}
