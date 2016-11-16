import { emit } from "~/util/sio";
import {
    setOnlineClients,
    joinOnlineClient,
    leaveOnlineClient,
    receiveMessage,
} from "~/shared/actions";

export function initListeners(socket, dispatch) {

    socket.on("get clients", (userIds) => {
        dispatch(setOnlineClients(userIds));
    });

    socket.on("joined", ({ _id }) => {
        dispatch(joinOnlineClient(_id));
    });

    socket.on("left", ({ _id }) => {
        dispatch(leaveOnlineClient(_id));
    });

    emit("get clients");
};

export function initAlertCreator(socket, dispatch) {

    socket.on("message", ({ chatId, message, type, name }) => {
        dispatch(receiveMessage({
            chatId,
            message,
            type,
            name,
        }))
    })

}
