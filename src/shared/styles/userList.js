import { defaultColor } from "~/shared/styles/colors";

export default {
    wideBody: {
        top: "40px",
        height: "calc(100% - 40px)",
        textAlign: "center",
    },
    centerer: {
        textAlign: "center",
    },
    teamInfo: {
        marginLeft: "15px",
        marginLeft: "15px",
        span: {
            display: "inline-block",
            verticalAlign: "textTop",
            marginTop: "40px",
            marginBottom: "0px",
            marginLeft: "20px",
            marginRight: "20px",
            paddingBottom: "50px",
        },
        h1: {
            paddingTop: "50px",
            marginTop: "0px",
        },
    },
    memberList: {
        marginTop: "20px",
    },
    userDisplay: {
        span: {
            padding: "20px",
            textAlign: "left",
            display: "inline-block",
            marginBottom: "15px",
            backgroundColor: "#c9c9c9",
            border: "1px solid #ababab",
            width: "90%",
            cursor: "pointer",
            ":hover": {
                backgroundColor: defaultColor,
            },
        },
        name: {
            fontSize: "17px",
            margin: "8px",
            verticalAlign: "middle",
        },
        glyph: {
            float: "right",
            marginTop: "10px",
            marginRight: "-10px",
            opacity: ".5",
            ":hover": {
                opacity: "1",
            },
        },
    },
}
