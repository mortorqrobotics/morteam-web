import { defaultColor } from "~/shared/styles/colors";

export default {
    modal: {
        position: "fixed",
        display: "block",
        left: "50%",
        top: "50%",
        right: "auto",
        bottom: "auto",
        marginLeft: "-175px",
        marginTop: "-207px",
        borderRadius: "3px",
        fontFamily: "'exo 2', sans-serif",
        fontWeight: "200",
        boxShadow: "0 3px 15px rgba(0, 0, 0, .4), 0 0 5px rgba(0, 0, 0, .4)",
        background: "#E9E9E9",
        padding: "0px",
    },
    title: {
        padding: "10px 15px",
        backgroundColor: defaultColor,
        color: "black",
    },
    content: {
        padding: "12px 15px",
        width: "350px",
        color: "#333",
    },
}
