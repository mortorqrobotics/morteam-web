function onlineClients(state = [], action) {
    switch (action.type) {
        case "SET_ONLINE_CLIENTS":
            console.log(action.userIds)
            return action.userIds;
        case "JOIN_ONLINE_CLIENT":
            console.log(state.concat(action.userId))
            return state.concat(action.userId);
        case "LEAVE_ONLINE_CLIENT":
            console.log(state.filter(a=>a!=action.userId))
            return state.filter(userId => userId !== action.userId);
        default:
            return state;
    }
}

function isLeftbarOpen(state = {}, action) {
    switch (action.type) {
        case "OPEN_LEFTBAR":
            return true;
        case "CLOSE_LEFTBAR":
            return false;
        default:
            return state;
    }
}

export default {
    onlineClients,
    isLeftbarOpen,
}
