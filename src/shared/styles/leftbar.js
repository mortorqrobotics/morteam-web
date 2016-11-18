// shared by calendar, chat, and drive
import { defaultOrange, hoverOrange, selectedOrange } from "~/shared/styles/colors";

const item = {
    height: "60px",
    borderBottom: "1px solid black",
    fontSize: "18px",
    textAlign: "left",
    padding: "18px",
    listStyle: "none",
}

export default {
    div: {
        backgroundColor: defaultOrange,
        width: "260px",
        height: "calc(100% - 30px)",
        position: "fixed",
        top: "40px",
        overflowY: "auto",
        boxShadow: "1px 4px 6px #ababab",
        zIndex: "87",
        WebkitOverflowScrolling: "touch",
    },
    ul: {
        padding: "0",
    },
    li: item,
    button: [item, {
        cursor: "pointer",
        ":hover": {
            backgroundColor: hoverOrange,
        },
    }],
    selected: {
        backgroundColor: selectedOrange,
        ":hover": {
            backgroundColor: selectedOrange,
        },
    },
    glyph: {
        marginRight: "5px",
    },
    hideButton: {
        position: "fixed",
        top: "calc(100% - 40px)",
        backgroundColor: selectedOrange,
        width: "28px",
        height: "30px",
        padding: "7px",
        cursor: "pointer",
        zIndex: "91",
        borderRadius: "20px",
        boxShadow: "0px 2px 8px -4px black",
        ":hover": {
            backgroundColor: "darkOrange"
        }
    }
}

export const dropdown = {
    button: {
        backgroundColor: defaultOrange,
        border: "none",
        padding: "3px 8px",
        borderRadius: "1px",
        cursor: "pointer",
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        ":hover": {
            backgroundColor: selectedOrange
        }
    },
    buttonShadow: {
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    caret: {
        display: "inline-block",
        width: "0",
        height: "0",
        marginLeft: "5px",
        verticalAlign: "middle",
        borderTop: "4px dashed",
        borderRight: "4px solid transparent",
        borderLeft: "4px solid transparent",
    },
    ul: {
        display: "block",
        width: "84px",
        backgroundColor: "f5f5f5",
        zIndex: "1000",
        position: "relative",
        padding: "5px 0",
        margin: "2px 0 0",
        backgroundClip: "padding-box",
        border: "1px solid rgba(0,0,0,.15)",
        boxShadow: "0 6px 12px rgba(0,0,0,.175)",
    },
    option: {
        cursor: "pointer",
        padding: "5px",
        listStyle: "none",
        fontSize: "14px",
        ":hover": {
            backgroundColor: defaultOrange
        },
    },
    selected: {
        backgroundColor: selectedOrange,
        ":hover": {
            backgroundColor: selectedOrange
        },
    }
}
