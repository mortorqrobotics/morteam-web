import { buttonShadow } from "~/shared/styles/boxShadows"

const item = {
    width: "100%",
    border: "none",
    borderRadius: "1px",
    marginTop: "10px",
    marginBottom: "5px",
    boxShadow: buttonShadow,
    ":focus": {
        outline: "none",
    },
}

const textBox = [item, {
    padding: "8px 4px 8px 4px",
    fontSize: "15px",
}]

export default {
    textBox: textBox,
    textArea: [textBox, {
        height: "84px",
        resize: "none",
    }],
    button: [item, {
        height: "37px",
        backgroundColor: "#ffc547",
        color: "black",
        ":hover": {
            backgroundColor: "orange",
        },
    }],
    errorMsg: {
        width: "100%",
        textAlign: "center",
        fontSize: "20px",
        marginTop: "10px",
        marginBottom: "-5px",
        display: "inline-block",
    },
}
