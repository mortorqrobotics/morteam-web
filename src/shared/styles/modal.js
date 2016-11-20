import { buttonShadow } from "~/shared/styles/boxShadows";
import { defaultColor, selectedColor } from "~/shared/styles/colors";

const item = {
    width: "100%",
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
        backgroundColor: defaultColor,
        color: "black",
        ":hover": {
            backgroundColor: selectedColor,
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
