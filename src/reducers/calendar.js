import { combineReducers } from "redux";

const initialState = [];

const events = (state = initialState, action) => {
    switch (action.type) {
        case "SET_EVENTS":
            return action.events
        default:
            return state
    }
}

export default combineReducers({
    events,
})
