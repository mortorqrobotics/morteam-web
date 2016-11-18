import { selectedOrange } from "~/shared/styles/colors";

export default {
    container: {
        height: "100%",
        marginTop: "40px",
    },
    item: {
        height: "calc(50% - 20px)",
        display: "inline-block",
        padding: "15px",
        width: "100%",
        display: "block",
        maxWidth: "600px",
//        marginTop: "10px",
        marginBottom: "5px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        marginTop: "10px",
        marginBottom: "0px",
        borderBottom: "1px solid " + selectedOrange,
        width: "200px",
        padding: "6px",
        backgroundColor: selectedOrange,
        color: "black",
        fontWeight: "100",
        display: "inline-block",
    },
    listContainer: {
        borderTop: "1px solid " + selectedOrange,
        marginTop: "0px",
        height: "80%",
        boxShadow: "0px 0px 8px -4px black",
        borderRadius: "0.1px",
        backgroundColor: "#f5f5f5",
    },
    ul: {
        padding: "10px 7px 7px 7px",
        height: "100%",
//        marginBottom: "0px",
        marginLeft: "15px",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        listStyleType: "disc",
        listStylePosition: "inside",
    },
    li: {
        marginTop: "20px",
        display: "list-item",
    },
    indented: {
        paddingLeft: "15px",
        wordWrap: "break-word",
    },
}
