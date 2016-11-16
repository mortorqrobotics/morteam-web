const button = {
    height: "37px",
    backgroundColor: "#C71111",
    color: "white",
    border: "none",
    ":hover": {
        cursor: "pointer",
        backgroundColor: "#800000",
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
    },
    p: {
        textAlign: "center",
    },
    deleteButton: [button, {width: "100%"}],
    confirmButton: [button, {width:"45%", margin: "0px 7px 0px 7px"}]
}
