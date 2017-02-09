import { defaultColor, hoverColor, selectedColor } from "~/shared/styles/colors";

const item = {
    margin: "25px 0px -10px 0px",
    textAlign: "center",
}

const button = {
    backgroundColor: hoverColor,
    borderRadius: "1px",
    padding: "3px 8px 3px 8px",
    ":hover": {
        backgroundColor: selectedColor,
    },
    ":focus": {
        outline: "none",
    },
}

export default {
    container: {
        backgroundColor: defaultColor,
        width: "260px",
        height: "calc(100% - 30px)",
        "@media screen and (max-width: 800px)": {
            width: "200px"
        },
        "@media screen and (max-width: 550px)": {
            width: "150px",
        },
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
        "@media screen and (max-width: 800px)": {
            marginLeft: "25px",
        },
        "@media screen and (max-width: 550px)": {
            marginLeft: "12px",
            width: "130px",
        },
        border: "2px solid gray",
        textAlign: "center",
    },
    name: [item, {
        fontSize: "24px",
        backgroundColor: selectedColor,
        fontWeight: "300",
    }],
    emailPhone: {
        fontSize: "18px",
        padding: "3px 6px 3px 6px",
    },
    button,
    positionIndicator: [button, {
        ":hover": {
            backgroundColor: hoverColor,
        },
    }],
    dropdown: {
        backgroundColor: hoverColor,
    },
    dropdownList: {
        display: "inline-block",
        textAlign: "center",
    },
}
