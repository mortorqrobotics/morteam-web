const userInfo = window.__userInfo;
export default userInfo;

export function isAdmin() {
    return userInfo.position == "leader" || userInfo.position == "mentor";
}
userInfo.isAdmin = isAdmin;
