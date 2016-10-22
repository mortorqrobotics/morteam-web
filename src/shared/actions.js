export const setOnlineClients = (userIds) => ({
    type: "SET_ONLINE_CLIENTS",
    userIds,
})

export const joinOnlineClient = (userId) => ({
    type: "JOIN_ONLINE_CLIENT",
    userId,
})

export const leaveOnlineClient = (userId) => ({
    type: "LEAVE_ONLINE_CLIENT",
    userId,
})

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
