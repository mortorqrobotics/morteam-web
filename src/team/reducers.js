import { combineReducers } from "redux";
import update from "react/lib/update";

const users = (state = [], action) => {
    switch (action.type) {
        case "DELETE_USER_SUCCESS":
            return update(state, {
                $splice: [
                    [state.findIndex(user => (
                        user._id == action.userId
                    )), 1]
                ]
            });
        case "LOAD_USERS_SUCCESS":
            return action.users
        default:
            return state
    }
}

export default combineReducers({
    users,
})
