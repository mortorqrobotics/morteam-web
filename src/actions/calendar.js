import ajax from "~/util/ajax";
import { prevAbsMonth, nextAbsMonth } from "~/util/date";

const addEventSync = (event) => {
    return {
        type: "ADD_EVENT",
        event,
    }
}

export const addEvent = (event) => {
    return (dispatch) => {
        return ajax.request("POST", "/events", event)
            .then(({ data }) => dispatch(addEventSync(data)))
    }
}

// absolute month contains the month from 0..11 and year

const setAbsMonthSync = ({ month, year }, events) => {
    return {
        type: "SET_ABS_MONTH",
        month,
        year,
        events,
    }
}

export const setAbsMonth = ({ month, year }) => {
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
