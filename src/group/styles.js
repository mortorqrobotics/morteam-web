import { defaultColor } from "~/shared/styles/colors";

const button = {
    fontSize: "28px",
    width: "300px",
    color: "white",
    border: "none",
    marginBottom: "20px",
    boxShadow: "1.5px, 3px, 8px, -2px, #983745",
}

export default {
    buttonContainer: {
        textAlign: "center",
    },
    groupName: {
      paddingTop: "50px",
      fontSize: "36px",
      textAlign: "center",
      marginBottom: "35px",
    },
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
