import { receiveMessage, messageSent, setIsTyping, pageClose } from "./actions";

export function initListeners(socket, dispatch) {

    socket.on("message", ({ chatId, message, type, name }) => {
        dispatch(receiveMessage({
            chatId,
            message,
            type,
            name,
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

    $(window).unload(() => {
        dispatch(pageClose());
    });
}
