const topButton = {
    fontSize: "20px",
    borderTop: "1px",
    borderLeft: "1px",
    borderRight: "1px",
    borderBottom: "0px",
    borderStyle: "solid",
    borderColor: "orange",
    width: "30px",
    height: "30px",
    textAlign: "center",
    color: "black",
    backgroundColor: "orange",
    display: "inline-block",
    boxShadow: "-1px -1px 4px -3px black",
    borderRadius: "0.1px",
}

export default {
    day: {
        maxWidth: "500px",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",
    },
    dayNum: topButton,
    dayContent: {
        paddingTop: "7px",
        paddingLeft: "7px",
        paddingRight: "7px",
        paddingBottom: "10px",
        borderTop: "1px solid orange",
        fontSize: "16px",
        marginBottom: "15px",
        boxShadow: "0 0 8px -4px black",
        borderRadius: "0.1px",
        backgroundColor: "#f5f5f5",
    },
    eventList: {
        marginLeft: "30px",
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
}
