export default{
    groupTypeOption:{
        button: {
            display: "inline-block",
            marginTop: "5px",
            padding: "0px 4px",
            marginRight: "4px",
            cursor: "pointer",
            color: "#333",
        },
        selected: {
            backgroundColor: "orange"
        },
        unselected: {
            backgroundColor: "#ffcc80"
        },
    },
    button:{
        width: "91.5%",
        height: "37px",
        backgroundColor: "#ffc547",
        border: "none",
        color: "black",
        position: "absolute",
        bottom: "15px",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        borderRadius: "1px",
        ":hover": {
            backgroundColor: "orange",
        }
    },
    textBox:{
        width: "100%",
        marginTop: "5px",
        marginBottom: "10px",
        border: "none",
        padding: "8px 4px",
        fontSize: "15px",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        borderRadius: "1px",
    }
}