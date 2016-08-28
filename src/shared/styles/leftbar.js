// shared by calendar, chat, and drive

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
        backgroundColor: "#FFC547",
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
            backgroundColor: "#FFB524",
        },
    }],
    selected: {
        backgroundColor: "orange",
        ":hover": {
            backgroundColor: "orange",
        },
    },
    glyph: {
        marginRight: "5px",
    },
}

export const dropdown = {
    button: {
        backgroundColor: "#FFC547",
        border: "none",
        padding: "3px 8px",
        borderRadius: "1px",
        cursor: "pointer",
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        ":hover": {
            backgroundColor: "orange"
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
            backgroundColor: "#ffc547"
        },
    },
    selected: {
        backgroundColor: "orange",
        ":hover": {
            backgroundColor: "orange"
        },
    }
}
