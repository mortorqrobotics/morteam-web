import ajax from "~/util/ajax";

const setEvents = (events) => {
    return {
        type: "SET_EVENTS",
        events,
    }
}

