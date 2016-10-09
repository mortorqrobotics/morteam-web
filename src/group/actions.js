import ajax from "~/util/ajax";
import { currentUser, pageOptions } from "~/util";

const groupId = pageOptions.groupId;
const currentUserId = currentUser._id;

export function fetchGroup() {
    return (dispatch) => {
        return ajax.request("GET", "/groups/id/" + groupId)
            .then(({ data }) => dispatch({
                type: "SET_GROUP",
                group: data,
            }))
    }
}

export function joinGroup() {
    return (dispatch) => {
        return ajax.request("POST", "/groups/normal/id/" + groupId + "/join")
            .then(() => dispatch({
                type: "JOIN_GROUP",
            }))
    }
}

export function leaveGroup() {
    return (dispatch) => {
        return ajax.request("DELETE", "/groups/normal/id/" + groupId + "/users/id/" + currentUserId)
            .then(() => dispatch({
                type: "LEAVE_GROUP",
            }))
    }
}


export function addUsers(users) {
    return (dispatch) => {"/groups/normal/id/:groupId/users"
        return ajax.request("POST", "/groups/normal/id/" + groupId + "/users", { users: users })
            .then(() => dispatch({
                type: "ADD_USERS",
                users,
            }))
    }
}

export function deleteUser(userId) {
    return (dispatch) => {
        return ajax.request("DELETE", "/groups/normal/id/" + groupId + "/users/id/" + userId)
            .then(() => dispatch({
                type: "DELETE_USER",
                userId,
            }))
    }
}

export function loadUsers(users) {
    return (dispatch) => {
        return ajax.request("GET", "/groups/normal/id/" + groupId + "/users")
            .then(({ data }) => dispatch({
                type: "LOAD_USERS",
                users: data,
            }))
    }
}
