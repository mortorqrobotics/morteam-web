import { prevAbsMonth, nextAbsMonth } from "~/util/date";
import update from "react/lib/update";

const initialEvents = {};
// initialEvents :: Map Year (Map Month [Event])

function events(state = initialEvents, action) {
    switch (action.type) {
        case "SET_ABS_MONTH_SUCCESS":
            const newState = {};
            for (const year of Object.keys(state)) {
                newState[year] = {};
                for (const month of Object.keys(state[year])) {
                    newState[year][month] = [].concat(state[year][month]);
                }
            }
            const absMonth = { month: action.month, year: action.year };
            for (const { month, year } of [
                prevAbsMonth(absMonth),
                absMonth,
                nextAbsMonth(absMonth),
            ]) {
                if (!(year in newState)) {
                    newState[year] = {};
                }
                if (!(month in newState[year])) {
                    newState[year][month] = [];
                }
            }
            for (const event of action.events) {
                event.date = new Date(event.date);
                const month = event.date.getMonth();
                const year = event.date.getFullYear();
                newState[year][month].push(event);
            }
            return newState
        case "ADD_EVENT_SUCCESS":
            const event = action.event;
            event.date = new Date(event.date);
            const year = event.date.getFullYear();
            const month = event.date.getMonth();
            if (!state[year] || !state[year][month]) {
                // this should never happen!
                throw new Error(
                    "year or month was missing in the store when creating a new event"
                );
            }
            return update(state, {
                [year]: {
                    [month]: {
                        $push: [event],
                    },
                },
            })
        case "DELETE_EVENT_SUCCESS":
            return update(state, {
                [action.event.date.getFullYear()]: {
                    [action.event.date.getMonth()]: {
                        $splice: [[action.event]],
                    },
                },
            })
        case "START_ATTENDANCE_SUCCESS":
            let eventYear, eventMonth, eventIndex;
            labelsIn2016:
            for (const year of Object.keys(state)) {
                for (const month of Object.keys(state[year])) {
                    const index = state[year][month].findIndex(({ _id }) => _id == action.eventId);
                    if (index !== -1) {
                        eventYear = year;
                        eventMonth = month;
                        eventIndex = index;
                        break labelsIn2016;
                    }
                }
            }
            return update(state, {
                [eventYear]: {
                    [eventMonth]: {
                        [eventIndex]: {
                            hasTakenAttendance: {
                                $set: true,
                            },
                        },
                    },
                },
            });
        default:
            return state
    }
}

// this shouldnt need to be here at all I think
const now = new Date();
const initialAbsMonth = {
    month: now.getMonth(),
    year: now.getFullYear()
};

function absMonth(state = initialAbsMonth, action) {
    switch (action.type) {
        case "SET_ABS_MONTH_SUCCESS":
            return {
                year: action.year,
                month: action.month,
            }
        default:
            return state
    }
}

function pendingTasks(state = [], action) {
    switch (action.type) {
        case "LOAD_PENDING_TASKS_SUCCESS":
            return action.tasks
        default:
            return state
    }
}

export default {
    events,
    absMonth,
    pendingTasks,
}
