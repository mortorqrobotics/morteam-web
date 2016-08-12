// shared by calendar, chat, and drive
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
        WebkitOverflowScrolling: "touch"
    },
    ul: {
        padding: "0",
    },
    li: {
        height: "60px",
        borderBottom: "1px solid black",
        fontSize: "18px",
        textAlign: "left",
        padding: "18px",
        cursor: "pointer",
        listStyle: "none",
    },
    button: {
        ":hover": {
            backgroundColor: "#FFB524"
        }
    },
    selected: {
        backgroundColor: "orange",
        ":hover": {
            backgroundColor: "orange"
        }
    },
    glyph: {
        marginRight: "5px",
    }
}
