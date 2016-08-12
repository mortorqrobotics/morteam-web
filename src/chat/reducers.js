import { combineReducers } from "redux";

const initialChats = [];

const chats = (state = initialChats, action) => {
    switch (action.type) {
        case "SET_CHATS":
            return action.chats
        case "ADD_CHAT":
            return [action.chat].concat(state)
        default:
            return state
    }
}

export default combineReducers({
    chats,
})
