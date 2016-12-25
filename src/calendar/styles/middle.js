import { selectedColor } from "~/shared/styles/colors";

const topButton = {
    fontSize: "20px",
    border: "1px solid " + selectedColor,
    width: "30px",
    height: "30px",
    textAlign: "center",
    color: "black",
    backgroundColor: selectedColor,
    display: "inline-block",
    boxShadow: "-1px -1px 4px -3px black",
    borderRadius: "0.1px",
}

const dayContent = {
    paddingTop: "7px",
    paddingLeft: "7px",
    paddingRight: "7px",
    paddingBottom: "10px",
    borderTop: "1px solid " + selectedColor,
    fontSize: "16px",
    marginBottom: "15px",
    boxShadow: "0 0 8px -4px black",
    borderRadius: "0.1px",
    backgroundColor: "#f5f5f5",
}

export default {
    container: {
        overflowY: "scroll",
        height: "100%",
    },
    day: {
        width: "90%",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",
    },
    dayNum: topButton,
    dayContent,
    currentDayContent: {
        ...dayContent,
        backgroundColor: "#ffcc80",
    },
    eventList: {
        marginLeft: "-30px",
        listStyleType: "disc",
        listStylePosition: "inside",
    },
    dayName: {
        marginLeft: "5px",
        display: "inline-block",
    },
    addButton: [topButton, {
        // TODO: this seems a few pixels too high
        opacity: "0.3",
        ":hover": {
            opacity: "0.7",
        },
        ":focus": {
            outline: "none",
        },
    }],
    eventItem: {
        display: "list-item",
    },
    recordGlyph: {
        marginLeft: "5px",
        ":hover": {
            cursor: "pointer",
            color: "darkorange",
        },
    },
}
