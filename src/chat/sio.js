import { receiveMessage, messageSent } from "./actions";

export function initListeners(socket, dispatch) {

    socket.on("message", ({ chatId, message }) => {
        dispatch(receiveMessage({
            chatId,
            message,
        }))
    })

    socket.on("message-sent", ({ chatId }) => {
        dispatch(messageSent({
            chatId,
        }))
    })

}
