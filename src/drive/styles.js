import { standardBoxShadow } from "~/shared/styles/boxShadows";

const docList = {
    position: "absolute",
    width: "calc(100vw - 320px)",
    height: "calc(100vh - 50px)",
    top: "60px",
    display: "block",
}

export default {
    left: {
        glyph: {
            fontSize: "23px",
            marginLeft: "5px",
            marginRight: "14px",
        },
    },
    docList: {
        leftbarOpen: [docList, {
            left: "300px",
        }],
        leftbarClosed: [docList, {
            left: "40px",
        }],
    },
    frame: {
        margin: "4px",
        height: "208px",
        width: "150px",
        cursor: "pointer",
        boxShadow: "3px 3px 8px #a9a9a9",
        display: "inline-block",
    },
    preview: {
        width: "140px",
        height: "140px",
        margin: "0 auto",
        objectFit: "cover",
        position: "absolute",
        top: "5px",
        left: "0",
        right: "0",
        bottom: "0",
    },
    addFile: {
        backgroundColor: "#e9e9e9",
        border: "3px dashed gray",
        textAlign: "center",
        verticalAlign: "middle",
        display: "table",
        ":hover": {
            backgroundColor: "#D0D0D0",
        },
    },
    fileTitle: {
        fontSize: "14px",
        position: "absolute",
        left: "4px",
        top: "145px",
        color: "white",
        width: "140px",
        height: "60px",
        wordWrap: "break-word",
        textAlign: "center",
    },
    description: {
        name: {
            display: "inline-block",
            lineHeight: "4",
            maxHeight: "37px",
            overflow: "hidden",
        },
        size: {
            position: "absolute",
            left: "0px",
            top: "43px",
            opacity: "0.8",
            fontSize: "14px",
            fontWeight: "300",
        },
        trash: {
            display: "inline-block",
            lineHeight: "1.3em",
            maxHeight: "37px",
            position: "absolute",
            right: "0px",
            top: "43px",
            ":hover": {
                color: "#a9a9a9",
            },
        },
    },
    glyph: {
        color: "gray",
        fontSize: "60px",
        verticalAlign: "middle",
        display: "table-cell",
    },
    deleteMenu: {
        p: {
            color: "white",
            textAlign: "center",
            marginTop: "20px",
        },
        button: {
            width: "80px",
            height: "40px",
            backgroundColor: "white",
            color: "black",
            marginTop: "20px",
            marginLeft: "35px",
            ":hover": {
                backgroundColor: "#e9e9e9",
            },
        },
    },
    chosenFile: {
        backgroundColor: "#e9e9e9",
        boxShadow: standardBoxShadow,
        width: "100%",
        borderRadius: "1px",
        padding: "4px 8px 4px 8px",
        overflow: "hidden",
        textAlign: "center",
        fontSize: "18px",
        height: "34px",
    },
}
