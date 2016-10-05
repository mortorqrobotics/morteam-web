import { combineReducers } from "redux";

function users(state = [], action) {

    switch (action.type) {

        case "JOIN_GROUP": 
            return state.concat([window.__userInfo]);
        case "LEAVE_GROUP":
            return state.filter(user => user._id != window.__userInfo._id);
        case "ADD_USERS":
            return state.concat(users);
        case "DELETE_USERS":
            return state.filter(user => user._id != action.userId);
        case "LOAD_USERS":
            return action.users;
        default:
            return state;
          
    }


export default combineReducers({
    users,
})


}