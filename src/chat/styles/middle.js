import { defaultColor, hoverColor, selectedColor } from "~/shared/styles/colors";


const triangle = {
    content: "",
    position: "absolute",
    borderStyle: "solid",
    display: "block",
    width: "0",
    zIndex: "1",
    top: "7px",
}

const wrapper = {
    minWidth: "400px",
    top: "40px",
    height: "calc(100% - 40px)",
    position: "absolute",
}

export default {
    container: {
        leftbarOpen: [wrapper, {
            width: "calc(100vw - 460px)",
            marginLeft: "300px",
        }],
        leftbarClosed: [wrapper, {
            width: "100vw",
            margin: "auto",
        }],
    },
    messagesDiv: {
        maxWidth: "700px",
        width: "95%",
        minWidth: "380px",
        minHeight: "250px",
        margin: "0 auto",
        zIndex: "-1",
        overflow: "auto",
        borderLeft: "2px solid #cccccc",
        borderRight: "2px solid " + defaultColor,
        WebkitOverflowScrolling: "touch",
    },
    inputDiv: {
        position: "relative",
        maxWidth: "700px",
        width: "95%",
        minWidth: "380px",
        margin: "9px auto",
        zIndex: "80",
        overflow: "hidden",
    },
    inputTextArea: {
        width: "85%",
        verticalAlign: "top",
        padding: "5px",
        resize: "none",
        overflowY: "hidden",
        // height: "30px",
        marginLeft: "8px",
        borderRadius: "5px",
        maxHeight: "260px",
        fontWeight: "bolder", // finally
        ":focus": {
            border: "1px solid " + hoverColor,
        },
    },
    sendButton: {
        backgroundColor: defaultColor,
        height: "30px",
        width: "12%",
        fontSize: "18px",
        borderRadius: "5px",
        marginLeft: "3px",
        ":hover": {
            backgroundColor: selectedColor,
        },
    },
}

const selfBubble = {
    backgroundColor: defaultColor,
    color: "black",
    maxWidth: "calc(100% - 100px)",
    float: "right",
    display: "block",
    margin: "10px",
    padding: "4px 10px 4px 10px",
    fontSize: "20px",
    borderRadius: "5px",
    minHeight: "40px",
    position: "relative",
    wordWrap: "break-word",
}

export const chatItem = {
    bubbleWrapper: {
        display: "block",
        width: "100%",
        minHeight: "40px",
        overflow: "hidden",
    },
    otherBubble: {
        backgroundColor: "#cccccc",
        color: "black",
        maxWidth: "calc(100% - 100px)",
        float: "left",
        display: "block",
        margin: "10px",
        padding: "4px 10px 4px 10px",
        fontSize: "20px",
        borderRadius: "5px",
        minHeight: "40px",
        position: "relative",
        wordWrap: "break-word",
        verticalAlign: "middle",
    },
    selfBubble,
    selfBubbleLoading: [selfBubble, {
        color: "#777777",
    }],
    otherTriangle: [triangle, {
        borderColor: "transparent #cccccc",
        left: "-9px",
        borderWidth: "6px 9px 6px 0px",
    }],
    selfTriangle: [triangle, {
        borderColor: "transparent " + defaultColor,
        right: "-9px",
        borderWidth: "6px 0px 6px 9px",
    }],
    profPic: {
        marginTop: "-3px",
    },
    chatOpponent: {
        display: "inline-block",
        paddingRight: "5px",
        fontWeight: "400",
        marginBottom: "0",
        marginLeft: "8px",
        cursor: "pointer",
        ":hover": {
            borderBottom: "1px solid #777",
        },
    },
    audienceTooltip: {
        color: "#a9a9a9",
        fontSize: "14px",
        fontFamily: "'exo 2', sans-serif",
    },
}
