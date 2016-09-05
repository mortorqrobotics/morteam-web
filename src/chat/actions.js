export const addChat = (chat) => ({
    type: "ADD_CHAT",
    payload: chat,
})

export const addMessage = ({ chatId, message }) => ({
    type: "ADD_MESSAGE",
    chatId,
    message,
})

export const sendMessage = (content) => ({
    type: "SEND_MESSAGE",
    payload: content,
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
