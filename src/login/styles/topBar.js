import { defaultOrange } from "~/shared/styles/colors";

const title = {
    display: "inline-block",
    color: "white",
    fontWeight: "200",
    fontFamily: "'exo 2', sans-serif",
}

export default {
    landingBox: {
        backgroundColor: defaultOrange,
        paddingTop: "30px",
        height: "80px",
        width: "100%",
        boxSizing: "unset"
    },
    h1: [title, {
        fontSize: "60px",
        paddingLeft: "30px",
        margin: "0px",
    }],
    h3: [title, {
        fontSize: "16px",
        paddingLeft: "10px",
    }],
}
