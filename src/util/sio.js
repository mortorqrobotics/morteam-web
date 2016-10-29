import io from "socket.io-client";

const socket = window.__socket = io.connect();

export function emit(name, data) {
    socket.emit(name, data);
}

export function initSIO(initializer) {
    initializer(socket);
}

