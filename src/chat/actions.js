import ajax from "~/util/ajax";

function setChats(chats) {
    return {
        type: "SET_CHATS",
        chats,
    }
}

function addChatSync(chat) {
    return {
        type: "ADD_CHAT",
        chat,
    }
}

export function fetchChats() {
    return (dispatch) => {
        return ajax.request("GET", "/chats")
            .then(({ data }) => dispatch(setChats(data)))
    }
}

export function addChat(chat) {
    return (dispatch) => {
        return ajax.request("POST", "/chats", chat)
            .then(({ data }) => dispatch(addChatSync(data)))
    }
}

function sendMessageSync({ chatId, message }) {
    return {
        type: "ADD_MESSAGE",
        chatId,
        message,
    }
}

export function sendMessage(content) {
    return (dispatch, getState) => {
        const state = getState();
        return ajax.request("POST", "/chats/id/" + state.currentChatId + "/messages", {
            content,
        }).then(({ data }) => {
            return dispatch(sendMessageSync({
                chatId: state.currentChatId,
                message: data,
            }));
        })
    }
}

function setChatNameSync({ chatId, name }) {
    return {
        type: "SET_CHAT_NAME",
        chatId,
        name,
    }
}

export function setChatName({ chatId, name }) {
    return (dispatch) => {
        return ajax.request("PUT", "/chats/group/id/" + chatId + "/name", {
            newName: name,
        }).then(() => dispatch(setChatNameSync({ chatId, name })))
    }
}

export function setCurrentChatId(chatId) {
    return {
        type: "SET_CURRENT_CHAT_ID",
        chatId,
    }
}

function addMessagesSync({ chatId, messages }) {
    return {
        type: "ADD_MESSAGES",
        chatId,
        messages,
    }
}

export function fetchMessages() {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.currentChatId) {
            return;
        }
        const chat = state.chats.find(chat => chat._id == state.currentChatId);
        return ajax.request("GET",
            "/chats/id/" + chat._id + "/messages?skip=" + chat.messages.length
            // TODO: can the skip thing be put in the third param?
        ).then(({ data }) => {
            return dispatch(addMessagesSync({
                chatId: chat._id,
                messages: data
            }))
        });
    }
}
