export const deleteUser = (userId) => {
    return {
        type: "DELETE_USER",
        payload: userId,
    }
}
