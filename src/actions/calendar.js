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

const setAbsMonthSync = (month, year, eventLists) => {
    return {
        type: "SET_ABS_MONTH",
        month,
        year,
        eventLists,
    }
}

export const setAbsMonth = ({ month, year }) => {
    return (dispatch, getState) => {
        const state = getState();
        return Promise.all([
            prevAbsMonth({ month, year }),
            { month, year },
            nextAbsMonth({ month, year }),
        ]
            .filter(({ month, year }) => !(year in state) || !(month in state[year]))
            .map(({ month, year }) =>
                ajax.request("GET", "/events/year/" + year + "/month/" + month)
                    .then(({ data }) => Promise.resolve({ month, year, events: data }))
        ).then(eventLists => dispatch(setAbsMonthSync(month, year, eventLists)));
    }
}
