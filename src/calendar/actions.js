import ajax from "~/util/ajax";
import { prevAbsMonth, nextAbsMonth } from "~/util/date";

function addEvent(event) {
    return {
        type: "ADD_EVENT",
        event,
    }
}

// absolute month contains the month from 0..11 and year

export function setAbsMonth({ month, year }, events) {
    return {
        type: "SET_ABS_MONTH",
        month,
        year,
        events,
    }
}

