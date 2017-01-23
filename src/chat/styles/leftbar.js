import { selectedColor } from "~/shared/styles/colors";

const color = "#ffdd78";

export default {
    container: {
      width: "auto",
      maxWidth: "300px",
    },
    img: {
        width: "30px",
        height: "30px",
        objectFit: "cover",
        borderRadius: "5px",
        marginRight: "10px",
    },
    searchLi: {
        borderBottom: "1px solid black",
    },
    searchBox: {
        width: "100%",
        backgroundColor: selectedColor,
        fontSize: "20px",
        borderRadius: "15px",
        margin: "5px 0px 5px 0px",
        padding: "2px 9px 2px 9px",
        color: "white",
        ":focus": {
            outline: "none",
        },
    },
    searchPlaceholder: {
        "::-webkit-input-placeholder": {
            color: color,
        },
        ":-moz-placeholder": {
            color: color,
        },
        "::-moz-placeholder": {
            color: color,
        },
        ":-ms-input-placeholder": {
            color: color,
        },
    },
    cog: {
        float: "right",
        opacity: "0.5",
        fontSize: "13px",
        marginTop: "7px",
        cursor: "pointer",
        ":hover": {
            opacity: "1",
        },
    },
    tab: {
        right: {
             display: "inline-block",
            borderRight: "1px solid black",
        },
        left: {
            display: "inline-block",
        },
    },
}
