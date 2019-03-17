import { standardBoxShadow } from "~/shared/styles/boxShadows";

const button = {
    height: "37px",
    backgroundColor: "#cc0000",
    color: "white",
    boxShadow: standardBoxShadow,
    ":hover": {
        cursor: "pointer",
        backgroundColor: "#b30000",
    },
};
export default {
    ul: {
        maxHeight: "270px",
        overflow: "auto",
        marginLeft: "-40px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    li: {
        height: "41px",
        listStyleType: "none",
        borderBottom: "1px solid #a9a9a9",
        padding: "5px",
    },
    addMemberLi: {
        ":hover": {
            backgroundColor: "lightgray",
            cursor: "pointer",
        },
    },
    img: {
        width: "30px",
        height: "30px",
        objectFit: "cover",
        borderRadius: "5px",
    },
    plus: {
        fontSize: "25px",
        verticalAlign: "middle",
        width: "30px",
        height: "30px",
    },
    trash: {
        opacity: "0.5",
        float: "right",
        marginTop: "10px",
        ":hover": {
            cursor: "pointer",
            opacity: "1",
        },
    },
    span: {
        paddingLeft: "5px",
        verticalAlign: "middle",
    },
    memberSpan: {
        ":hover": {
            textDecoration: "underline",
            cursor: "pointer",
        },
    },
    p: {
        textAlign: "center",
    },
    confirmAddButton: {
        backgroundColor: "#1bb72d",
        color: "#fff",
        ":hover": {
            backgroundColor: "#009933",
        },
    },
    deleteButton: [button, {width: "100%"}],
    confirmButton: [button, {width:"45%", margin: "0px 7px 0px 7px"}]
}
