import ajax from "~/util/ajax"

export function joinGroup() {

    return dispatch => {
        return ajax.request("POST", 
            `/groups/normal/id/${window.__userInfo._id}/join`
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
            `/groups/normal/id/${window.__options.groupId}/users/id/${window.__userInfo._id}`
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

    return {
    
        type: "DELETE_USER",
        userId,
    }
}


export function loadUsers(users) {

    return {

        type: "LOAD_USERS",
        users,
    }

}
