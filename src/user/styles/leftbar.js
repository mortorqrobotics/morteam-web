const item = {
    margin: "25px 0px -10px 0px",
    textAlign: "center",
}

const button = {
    backgroundColor: "#ffb524",
    border: "none",
    borderRadius: "1px",
    padding: "3px 8px 3px 8px",
    ":hover": {
        backgroundColor: "orange",
    },
    ":focus": {
        outline: "none",
    },
}

export default {
    container: {
        backgroundColor: "#ffc547",
        width: "260px",
        height: "calc(100% - 30px)",
        position: "fixed",
        top: "40px",
        overflowY: "auto",
        boxShadow: "1px 3px 6px #ababab",
        zIndex: "87",
        WebkitOverflowScrolling: "touch",
    },
    item,
    img: {
        margin: "24px 54px -10px 54px",
        width: "150px",
        height: "150px",
        border: "2px solid gray",
        objectFit: "cover",
    },
    name: [item, {
        fontSize: "24px",
        backgroundColor: "orange",
        fontWeight: "300",
    }],
    emailPhone: {
        fontSize: "18px",
        padding: "3px 6px 3px 6px",
    },
    button,
    positionIndicator: [button, {
        ":hover": {
            backgroundColor: "##ffb524",
        },
    }],
    dropdown: {
        backgroundColor: "#ffb524",
    },
    dropdownList: {
        display: "inline-block",
        textAlign: "center",
    },
}
