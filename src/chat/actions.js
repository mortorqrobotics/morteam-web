export const addChat = (chat) => ({
    type: "ADD_CHAT",
    payload: chat,
})

export const receiveMessage = ({ chatId, message }) => ({
    type: "RECEIVE_MESSAGE_SUCCESS",
    chatId,
    message,
})

export const sendMessage = (content) => ({
    type: "SEND_MESSAGE",
    payload: content,
})

export const messageSent = ({ chatId }) => ({
    type: "SEND_MESSAGE_SUCCESS",
    chatId,
})

export const setChatName = ({ chatId, name }) => ({
    type: "SET_CHAT_NAME",
    payload: {
        chatId,
        name,
    },
})

export const setCurrentChatId = (chatId) => ({
    type: "SET_CURRENT_CHAT_ID",
    chatId,
})

export const loadMessages = () => ({
    type: "LOAD_MESSAGES",
})
