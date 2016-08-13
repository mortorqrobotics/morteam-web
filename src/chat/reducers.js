import { combineReducers } from "redux";

const initialChats = [];

const chats = (state = initialChats, action) => {
    switch (action.type) {
        case "SET_CHATS":
            return action.chats
        case "ADD_CHAT":
            return [action.chat].concat(state)
        case "SET_CHAT_NAME":
            const index = state.findIndex(chat => chat._id == action.chatId)
            return state.slice(0, index).concat([{
                ...state[index],
                name: action.name,
            }]).concat(state.slice(index + 1))
        default:
            return state
    }
}

const initialCurrentChatId = null;

const currentChatId = (state = initialCurrentChatId, action) => {
    switch (action.type) {
        case "SET_CHATS":
            if (action.chats.length > 0) {
                return action.chats[0]._id
            } else {
                return null
            }
        case "SET_CURRENT_CHAT_ID":
            return action.chatId
        default:
            return state
    }
}

export default combineReducers({
    chats,
    currentChatId,
})
