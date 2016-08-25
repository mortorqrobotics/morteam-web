import { combineReducers } from "redux";
import update from "react/lib/update";
import { reverse } from "~/util";

const initialChats = [];

function chats(state = initialChats, action) {
    let index;
    switch (action.type) {
        case "SET_CHATS":
            return action.chats
        case "ADD_CHAT":
            return [action.chat].concat(state)
        case "SET_CHAT_NAME":
            index = state.findIndex(chat => chat._id == action.chatId)
            return state.slice(0, index).concat([{
                ...state[index],
                name: action.name,
            }]).concat(state.slice(index + 1))
        case "ADD_MESSAGE":
            index = state.findIndex(chat => chat._id == action.chatId)
            return state.slice(0, index).concat([{
                ...state[index],
                messages: state[index].messages.concat([action.message]),
            }]).concat(state.slice(index + 1))
        case "ADD_MESSAGES":
            index = state.findIndex(chat => chat._id == action.chatId)
            return state.slice(0, index).concat([{
                ...state[index],
                messages: reverse(action.messages).concat(state[index].messages),
            }]).concat(state.slice(index + 1))
        default:
            return state
    }
}

const initialCurrentChatId = null;

function currentChatId(state = initialCurrentChatId, action) {
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
