import { combineReducers } from "redux";

const selectedTeam = (state = [], action) => {
    switch (action.type) {
        case "SET_TEAM":
            return action.team
        default:
            return state
    }
}

export default combineReducers({
    selectedTeam,
})
