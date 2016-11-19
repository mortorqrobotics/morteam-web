import update from "react/lib/update";
import { reverse, currentUser } from "~/util";

const initialChats = [];

function chats(state = initialChats, action) {
    let index;
    switch (action.type) {
        case "LOAD_CHATS_SUCCESS":
            return action.chats
        case "ADD_CHAT_SUCCESS":
            return [action.chat].concat(state)
        case "DELETE_CHAT_SUCCESS":
            return state.filter(chat => chat._id !== action.chat._id)
        case "SET_CHAT_NAME_SUCCESS":
            index = state.findIndex(chat => chat._id === action.chatId);
            return update(state, {
                [index]: {
                    name: {
                        $set: action.name,
                    },
                },
            })
        case "RECEIVE_MESSAGE_SUCCESS":
            console.log(state);
            index = state.findIndex(chat => chat._id === action.chatId);
            const newState = update(state, {
                [index]: {
                    messages: {
                        $push: [action.message],
                    },
                    updated_at: {
                        $set: action.timestamp, 
                    },
                },
            })
            return newState.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        case "SEND_MESSAGE_LOADING":
            index = state.findIndex(chat => chat._id === action.chatId);
            return update(state, {
                [index]: {
                    messages: {
                        $push: [{
                            author: currentUser,
                            content: action.content,
                            isLoading: true,
                        }],
                    },
                },
            })
        case "SEND_MESSAGE_SUCCESS":
            index = state.findIndex(chat => chat._id === action.chatId);
            const index2 = state[index].messages.findIndex(msg => msg.isLoading);
            return update(state, {
                [index]: {
                    messages: {
                        [index2]: {
                            isLoading: {
                                $set: false,
                            },
                            content: {
                                $set: action.content,
                            },
                        },
                    },
                },
            })
        case "LOAD_MESSAGES_SUCCESS":
            index = state.findIndex(chat => chat._id === action.chatId);
            return update(state, {
                [index]: {
                    messages: {
                        $unshift: action.messages,
                    },
                },
            })
        case "ALL_MESSAGES_LOADED":
            index = state.findIndex(chat => chat._id === action.chatId);
            return update(state, {
                [index]: {
                    areAllMessagesLoaded: {
                        $set: true,
                    },
                },
            })
        case "SET_IS_TYPING":
            index = state.findIndex(chat => chat._id === action.chatId);
            return update(state, {
                [index]: {
                    isTyping: {
                        $set: action.isTyping,
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

export default {
    chats,
    currentChatId,
}
