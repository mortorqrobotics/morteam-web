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
    img: {
        width: "30px",
        height: "30px",
        objectFit: "cover",
        borderRadius: "5px",
    },
    span: {
        paddingLeft: "5px",
        verticalAlign: "middle",
        cursor: "pointer",
        ":hover": {
            textDecoration: "underline",
        },
    },
    p: {
        textAlign: "center",
    },
    deleteButton: [button, {width: "100%"}],
    confirmButton: [button, {width:"45%", margin: "0px 7px 0px 7px"}]
}
