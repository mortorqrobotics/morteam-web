const signupElem = {
    border: "none",
    left: "50%",
    marginLeft: "-150px",
    width: "300px",
    boxShadow: "1.5px 3px 8px -2px #BA7000",
    ":focus": {
        outline: "none",
    },
}

export default {
    form: {
        position: "relative",
        textAlign: "center",
    },
    container: {
        width: "360px",
        height: "640px",
        backgroundColor: "#FFC547",
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: "-330px 0 0 -180px",
        borderRadius: "1px",
        boxShadow: "3px 5px 10px -2px gray",
    },
    input: [signupElem, {
        display: "block",
        position: "relative",
        height: "40px",
        fontSize: "25px",
        marginTop: "20px",
        padding: "8px",
    }],
    submitButton: [signupElem, {
        backgroundColor: "#0099FF",
        borderRadius: "1px",
        fontSize: "32px",
        position: "absolute",
        height: "50px",
        top: "530px",
        ":hover": {
            backgroundColor: "#008AE6",
            cursor: "pointer",
        },
    }],
}
