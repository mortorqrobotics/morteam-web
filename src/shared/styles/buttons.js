const button = {
    fontSize: "28px",
    width: "300px",
    color: "white",
    border: "none",
    marginBottom: "20px",
    boxShadow: "1.5px, 3px, 8px, -2px, #983745",
}
export default{
    leaveButton: [button, {
        backgroundColor: "#DD2818",
        pointer: "cursor",
        ":hover": {
            backgroundColor: "#C71111",
        },
    }],
    inviteButton: [button, {
        backgroundColor: "#1BB72D",
        pointer: "cursor",
        ":hover": {
            backgroundColor: "#009933",
        },
    }],
}