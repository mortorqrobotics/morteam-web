export function addEvent(event) {
    return {
        type: "ADD_EVENT",
        payload: event,
    }
}

// absolute month contains the month from 0..11 and year

export function setAbsMonth({ month, year }) {
    return {
        type: "SET_ABS_MONTH",
        payload: {
            month,
            year,
        },
    }
}

