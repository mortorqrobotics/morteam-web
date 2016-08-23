import { combineReducers } from "redux";
import update from "react/lib/update";

const users = (state = [], action) => {
    switch (action.type) {
        case "DELETE_USER":
            return update(state, {
                $splice: [
                    [state.findIndex(user => (
                        user._id == action.user._id
                    )), 1]
                ]
            });
        case "SET_USERS":
            return action.users
        default:
            return state
    }
}

export default combineReducers({
    users,
})
