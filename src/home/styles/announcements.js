import { standardBoxShadow } from "~/shared/styles/boxShadows";

export default {
    container: {
        maxWidth: "700px",
        margin: "auto",
        width: "90%",
    },
    announcement: {
        maxWidth: "700px",
        width: "100%",
        backgroundColor: "white",
        padding: "10px",
        marginTop: "0px",
        marginBottom: "20px",
        borderRadius: "1px",
        fontSize: "16px",
        position: "relative",
        boxShadow: standardBoxShadow,
        whiteSpace: "pre-wrap",
    },
    author: {
        fontSize: "18px",
        marginLeft: "8px",
        cursor: "pointer",
    },
    time: {
        fontSize: "15px",
        color: "#888888",
    },
    deleteIcon: {
        position: "absolute",
        top: "8px",
        right: "8px",
        color: "#e9e9e9",
        ":hover": {
            color: "#c11d20",
            cursor: "pointer",
        },
    },
    globe: {
        marginLeft: "5px",
        color: "#a9a9a9",
        ":hover": {
            color: "#555555",
        },
    },
    audienceTooltip: {
        color: "#a9a9a9",
        fontSize: "14px",
        // TODO: put this default font stuff in one place
        // the tooltip is not affected by the styles in Root
        fontFamily: "'exo 2', sans-serif",
    },
    right: {
        width: "200px",
    	display: "inline-block",
    	verticalAlign: "top",
    	height: "700px !important",
    	marginTop: "15px",
    	"@media screen and (max-width: 700px)": {
	        display: "none",
        },
    },
}
