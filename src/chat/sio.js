import {
    receiveMessage,
    messageSent,
    setIsTyping,
    pageClose,
    addChatSync,
    deleteChatSync,
    setChatNameSync,
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

    socket.on("deleteChat", ({ chatId }) => {
        dispatch(deleteChatSync(chatId));
    });

    socket.on("renameChat", ({ chatId, name }) => {
        dispatch(setChatNameSync({ chatId, name }));
    });

    $(window).unload(() => {
        dispatch(pageClose());
    });
}
