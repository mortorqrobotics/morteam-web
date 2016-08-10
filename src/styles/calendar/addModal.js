const input = {
    width: "100%",
    border: "none",
    marginTop: "5px",
    marginBottom: "10px",
    padding: "8px 4px 8px 4px",
    fontSize: "15px",
    boxShadow: "1.5px 3px 8px -2px #a9a9a9",
    borderRadius: "1px",
    ":focus": {
        outline: "none",
    },
}

export default {
    container: {
        textAlign: "center",
    },
    textBox: input,
    textArea: [input, {
        resize: "none",
    }],
    button: {
        width: "91.5%",
        height: "37px",
        backgroundColor: "#ffc547",
        border: "none",
        color: "black",
        position: "absolute",
        bottom: "15px",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        borderRadius: "1px",
        cursor: "pointer",
        ":focus": {
            outline: "none",
        },
        ":hover": {
            backgroundColor: "orange",
        },
    },
}
