import {
    receiveMessage,
    messageSent,
    setIsTyping,
    pageClose,
    addChatSync,
} from "./actions";

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

    socket.on("newChat", ({ chat }) => {
        dispatch(addChatSync(chat));
    });

    $(window).unload(() => {
        dispatch(pageClose());
    });
}
