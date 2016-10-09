import { combineReducers } from "redux";

function users(state = [], action) {
    switch (action.type) {
        case "JOIN_GROUP":
            return state.concat([window.__userInfo]);
        case "LEAVE_GROUP":
            return state.filter(user => user._id != window.__userInfo._id);
        case "ADD_USERS":
            return state.concat(action.users); // TODO: need to add user objects, not ids
        case "DELETE_USER":
            return state.filter(user => user._id != action.userId);
        case "LOAD_USERS":
            return action.users;
        default:
            return state;
    }
}

function group(state = {}, action) {
    switch (action.type) {
        case "SET_GROUP":
            return action.group;
        default:
            return state;
    }
}

export default combineReducers({
    users,
    group,
})
