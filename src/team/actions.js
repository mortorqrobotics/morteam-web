import { request } from "~/util/ajax";

export const deleteUser = (userId) => async (dispatch) => {
    await request("DELETE", `/teams/current/users/id/${userId}`);
    dispatch({
        type: "DELETE_USER_SUCCESS",
        userId,
    });
}

const loadUsers = () => async (dispatch) => {
    const { data } = await request("GET", "/teams/current/users");
    dispatch({
        type: "LOAD_USERS_SUCCESS",
        users: data,
    });
}

export function initialActions(dispatch) {
    dispatch(loadUsers());
}
