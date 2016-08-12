import ajax from "~/util/ajax";

const setChats = (chats) => {
    return {
        type: "SET_CHATS",
        chats,
    }
}

const addChatSync = (chat) => {
    return {
        type: "ADD_CHAT",
        chat,
    }
}

export const fetchChats = () => {
    return (dispatch) => {
        return ajax.request("GET", "/chats")
            .then(({ data }) => dispatch(setChats(data)))
    }
}

export const addChat = (chat) => {
    return (dispatch) => {
        return ajax.request("POST", "/chats", chat)
            .then(({ data }) => dispatch(addChatSync(data)))
    }
}
