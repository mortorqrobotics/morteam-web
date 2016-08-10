export default {
    dropdown: {
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
            padding: "5px 0",
            margin: "2px 0 0",
            backgroundClip: "padding-box",
            border: "1px solid rgba(0,0,0,.15)",
            boxShadow: "0 6px 12px rgba(0,0,0,.175)",
        },
        item: {
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
}
