import ajax from "~/util/ajax";
import { currentUser, pageOptions } from "~/util";

export function joinGroup() {

    return dispatch => {
        return ajax.request("POST",
            `/groups/normal/id/${currentUser._id}/join`
        ). then(({ data }) => {
            dispatch({
                type: "JOIN_GROUP",
            });
        });
    }

}


export function leaveGroup() {

    return dispatch => {
        return ajax.request("DELETE",
            `/groups/normal/id/${pageOptions.groupId}/users/id/${currentUser._id}`
        ).then(({ data }) => {
            dispatch({
                type: "LEAVE_GROUP",
            });
        });
    }

}


export function addUsers(users) {

    return dispatch => {
        return ajax.request("POST",
            `/groups/normal/id/${user._id}/join`,
            users
        ).then(({ data }) => {
            dispatch({
                type: "ADD_USERS",
                users: data,
            });
        });
    }

}


export function deleteUser(userId) {

    return dispatch => {
        return ajax.request("DELETE",
            `/groups/normal/id/${pageOptions.groupId}/users/id/${userId}`
        ).then(({ data }) => {
            dispatch({
                type: "DELETE_USER",
                userId: data,
            });
        });
    }

}


export function loadUsers(users) {

    return dispatch => {
        return ajax.request("GET",
            `/groups/normal/id/${pageOptions.groupId}/users`
        ).then(({ data }) => {
            dispatch({
                type: "LOAD_USERS",
                users: data,
            });
        });
    }

}
