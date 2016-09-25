export default{
    leftbar:{
        div: {
            verticalAlign: "top",
            marginTop: "15px",
            marginLeft: "15px",
            padding: "10px",
            width: "200px",
            display: "inline-block",
            background: "white",
            boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        },
        span: {
            color: "gray",
            display: "inline-block",
            marginBottom: "6px",
        },
        link: {
            color: "gray",
            textDecoration: "none",
            ":hover": {
                textDecoration: "underline",
            }
        },
        h5: {
            marginBottom: "15px",
        },
    },
    leftbarButton:{    
        button: {
            fontsize: "14px",
            ":hover": {
                backgroundColor: "#E9E9E9",
                cursor: "pointer",
            }
        },
        glyph: {
            marginRight: "5px"
        }
    }, 
}