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

const sendMessageSync = ({ chatId, message }) => {
    return {
        type: "ADD_MESSAGE",
        chatId,
        message,
    }
}

export const sendMessage = (content) => {
    return (dispatch, getState) => {
        const state = getState();
        console.log(state)
        return ajax.request("POST", "/chats/id/" + state.currentChatId + "/messages", {
            content,
        }).then(({ data }) => {
            dispatch(sendMessageSync({ chatId: state.currentChatId, message: data }));
        })
    }
}

const setChatNameSync = ({ chatId, name }) => {
    return {
        type: "SET_CHAT_NAME",
        chatId,
        name,
    }
}

export const setChatName = ({ chatId, name }) => {
    return (dispatch) => {
        return ajax.request("PUT", "/chats/group/id/" + chatId + "/name", {
            newName: name,
        }).then(() => dispatch(setChatNameSync({ chatId, name })))
    }
}

export const setCurrentChatId = (chatId) => {
    return {
        type: "SET_CURRENT_CHAT_ID",
        chatId,
    }
}
