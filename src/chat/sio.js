import { receiveMessage, messageSent, setIsTyping } from "./actions";

export function initListeners(socket, dispatch) {

    socket.on("message", ({ chatId, message }) => {
        dispatch(receiveMessage({
            chatId,
            message,
        }))
    })

    socket.on("message-sent", ({ chatId, content }) => {
        dispatch(messageSent({
            chatId,
            content,
        }))
    })

    socket.on("start typing", ({ chatId }) => {
        dispatch(setIsTyping({
            chatId,
            isTyping: true,
        }))
    })

    socket.on("stop typing", ({ chatId }) => {
        dispatch(setIsTyping({
            chatId,
            isTyping: false,
        }))
    })
}
