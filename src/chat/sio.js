import io from "socket.io-client";
import { receiveMessage, messageSent } from "./actions";

const socket = io.connect();

export function emit(name, data) {
    socket.emit(name, data);
}

export function initSIO(dispatch) {

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
