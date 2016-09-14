import { combineReducers } from "redux";
import update from "react/lib/update";
import { reverse } from "~/util";

const initialChats = [];

function chats(state = initialChats, action) {
    let index;
    switch (action.type) {
        case "LOAD_CHATS_SUCCESS":
            return action.chats
        case "ADD_CHAT_SUCCESS":
            return [action.chat].concat(state)
        case "SET_CHAT_NAME_SUCCESS":
            index = state.findIndex(chat => chat._id == action.chatId);
            return update(state, {
                [index]: {
                    name: {
                        $set: action.name,
                    },
                },
            })
        case "ADD_MESSAGE":
            index = state.findIndex(chat => chat._id == action.chatId);
            return update(state, {
                [index]: {
                    messages: {
                        $push: [action.message],
                    },
                },
            })
        case "LOAD_MESSAGES_SUCCESS":
            index = state.findIndex(chat => chat._id == action.chatId);
            return update(state, {
                [index]: {
                    messages: {
                        $unshift: action.messages,
                    },
                },
            })
        case "ALL_MESSAGES_LOADED":
            index = state.findIndex(chat => chat._id == action.chatId);
            return update(state, {
                [index]: {
                    areAllMessagesLoaded: {
                        $set: true,
                    },
                },
            })
        default:
            return state
    }
}

const initialCurrentChatId = null;

function currentChatId(state = initialCurrentChatId, action) {
    switch (action.type) {
        case "LOAD_CHATS_SUCCESS":
            if (!state && action.chats.length > 0) {
                return action.chats[0]._id
            } else {
                return null
            }
        case "ADD_CHAT_SUCCESS":
            if (!state) {
                return action.chat._id
            }
            return state
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
