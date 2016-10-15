import { request } from "~/util/ajax";
import { currentUser, pageOptions } from "~/util";

const groupId = pageOptions.groupId;
const currentUserId = currentUser._id;

export const joinGroup = () => async (dispatch) => {
    await request("POST", `/groups/normal/id/${groupId}/join`);
    dispatch({
        type: "JOIN_GROUP",
    });
}

export const leaveGroup = () => async (dispatch) => {
    await request("DELETE", `/groups/normal/id/${groupId}/users/id/${currentUserId}`);
    dispatch({
        type: "LEAVE_GROUP",
    });
}


export const addUsers = (users) => async (dispatch) => {
    await request("POST", `/groups/normal/id/${groupId}/users`, { users });
    dispatch({
        type: "ADD_USERS",
        users,
    });
}

export const deleteUser = (userId) => async (dispatch) => {
    await request("DELETE", `/groups/normal/id/${groupId}/users/id/${userId}`);
    dispatch({
        type: "DELETE_USER",
        userId,
    });
}

const loadUsers = () => async (dispatch) => {
    const { data } = await request("GET", `/groups/normal/id/${groupId}/users`);
    dispatch({
        type: "LOAD_USERS",
        users: data,
    });
}

const fetchGroup = () => async (dispatch) => {
    const { data } = await request("GET", `/groups/id/${groupId}`);
    dispatch({
        type: "SET_GROUP",
        group: data,
    });
}

export function initialActions(dispatch) {
    dispatch(fetchGroup());
    dispatch(loadUsers());
}
