import { standardBoxShadow } from "~/shared/styles/boxShadows";
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
            boxShadow: standardBoxShadow,
            "@media screen and (max-width: 700px)": {
	            display: "none",
            },
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