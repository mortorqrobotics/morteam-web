import { combineReducers } from "redux";

import { prevAbsMonth, nextAbsMonth } from "~/util/date";
import update from "react/lib/update";

const initialEvents = {};
// initialEvents :: Map Year (Map Month [Event])

const events = (state = initialEvents, action) => {
    switch (action.type) {
        case "SET_ABS_MONTH":
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
        case "ADD_EVENT":
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
        default:
            return state
    }
}

// this shouldnt need to be here at all I think
const now = new Date();
const initialAbsMonth = { month: now.getMonth(), year: now.getFullYear() }

const absMonth = (state = initialAbsMonth, action) => {
    switch (action.type) {
        case "SET_ABS_MONTH":
            return {
                year: action.year,
                month: action.month,
            }
        default:
            return state
    }
}

export default combineReducers({
    events,
    absMonth,
})
