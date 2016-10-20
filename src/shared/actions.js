export function setOnlineClients(userIds) {
    return {
        type: "SET_ONLINE_CLIENTS",
        userIds,
    }
}

export function joinOnlineClient(userId) {
    return {
        type: "JOIN_ONLINE_CLIENT",
        userId,
    }
}

export function leaveOnlineClient(userId) {
    return {
        type: "LEAVE_ONLINE_CLIENT",
        userId,
    }
}

export function openLeftbar() {
    return {
        type: "OPEN_LEFTBAR",
    }
}

export function closeLeftbar() {
    return {
        type: "CLOSE_LEFTBAR",
    }
}
