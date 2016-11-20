import orangeButton from "~/shared/styles/orangeButton";
import { standardBoxShadow } from "~/shared/styles/boxShadows";

export default {
    container: {
        maxWith: "700px",
        width: "90%",
        backgroundColor: "white",
        padding: "10px",
        marginTop: "0px",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "1px",
        fontSize: "10px",
        boxShadow: standardBoxShadow,
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
    },
    test: {
        display: "table",
        clear: "both",
        height: "0",
    },
    test2: {
        display: "table",
    },
    rtEditor: {
        width: "100%",
        verticalAlign: "top",
        height: "56px",
        padding: "5px",
        resize: "none",
        ":focus": {
            outline: "none",
        },
    },
    button: [orangeButton, {
        float: "right",
        fontSize: "18px",
        marginTop: "8px",
        marginRight: "2px",
        marginLeft: "2px",
        padding: "1px 6px 1px 6px",
        boxShadow: "2px 2px 4px #c9c9c9",
        height: "31px",
        ":disabled": {
            backgroundColor: "#ffe070",
            color: "#888888",
        },
    }],
}
