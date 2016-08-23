import ajax from "~/util/ajax";

const setUsers = (users) => {
    return {
        type: "SET_USERS",
        users,
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        return ajax.request("GET", "/teams/current/users")
            .then(({ data }) => dispatch(setUsers(data)))
    }
}

const deleteUserSync = (user) => {
    return {
        type: "DELETE_USER",
        user,
    }
}

export const deleteUser = (user) => {
    return (dispatch) => {
        return ajax.request("delete", "/teams/current/users/id/" + user._id)
            .then(() => dispatch(deleteUserSync(user)))
    }
}
