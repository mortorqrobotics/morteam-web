import io from "socket.io-client";
import { addMessage, } from "./actions";

const socket = io.connect();

export function emit(name, data) {
    socket.emit(name, data);
}

export function initSIO(dispatch) {

    socket.on("message", ({ chatId, message }) => {
        dispatch(addMessage({
            chatId,
            message,
        }))
    })

}
