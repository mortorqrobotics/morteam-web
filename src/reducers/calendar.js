import { combineReducers } from "redux";

const initialEvents = {};
// initialEvents :: Map Year (Map Month [Event])

const events = (state = initialEvents, action) => {
    switch (action.type) {
        case "SET_ABS_MONTH":
            return action.eventLists.reduce((state, { year, month, events }) => {
                return {
                    ...state,
                    [year]: {
                        ...(state[year] || {}),
                        [month]: events,
                    }
                }
            }, state)
        case "ADD_EVENT":
            const event = action.event;
            const date = event.date;
            const year = date.getFullYear();
            const month = date.getMonth();
            if (!state[year] || !state[year][month]) {
                // this should never happen!
                throw new Error(
                    "year or month was missing in the store when creating a new event"
                );
            }
            return {
                ...state,
                [year]: {
                    ...state[year],
                    [month]: state[year][month].concat([event])
                }
            }
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
