export default {
    container: {
        maxWidth: "700px",
        margin: "auto",
        width: "90%",
    },
    announcement: {
        maxWidth: "700px",
        width: "100%",
        backgroundColor: "white",
        padding: "10px",
        marginTop: "0px",
        marginBottom: "20px",
        borderRadius: "1px",
        fontSize: "16px",
        position: "relative",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        whiteSpace: "pre-wrap",
    },
    author: {
        fontSize: "18px",
        marginLeft: "8px",
        cursor: "pointer",
    },
    time: {
        fontSize: "15px",
        color: "#888888",
    },
    image: {
        width: "40px",
        height: "40px",
        objectFit: "cover",
        borderRadius: "5px",
        cursor: "pointer",
    },
    deleteIcon: {
        position: "absolute",
        top: "8px",
        right: "8px",
        color: "#e9e9e9",
        ":hover": {
            color: "#c11d20",
            cursor: "pointer",
        },
    },
}
