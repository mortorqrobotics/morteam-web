import orangeButton from "~/shared/styles/orangeButton";
import { standardBoxShadow } from "~/shared/styles/boxShadows";

export default {
    centerWrapper: {
        marginTop: "50px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "70%",
        whiteSpace: "nowrap",
        textAlign: "center",
        "@media screen and (max-width: 700px)": {
	        width: "100%",
        },
    },
    image: {
        width: "75px",
        marginRight: "50px",
    },
    topInfoContainer: {
      display: "inline-block",
      verticalAlign: "middle",
    },
    glyph: {
        marginRight: "10px",
    },
    h3: {
        display: "inline-block",
    },
    button: [orangeButton, {
        marginTop: "10px",
        width: "300px",
        boxShadow: standardBoxShadow,
        fontSize: "28px",
    }], 
    
}