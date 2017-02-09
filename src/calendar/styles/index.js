import { defaultColor } from "~/shared/styles/colors";

const grid = {
    overflow:"hidden",
    marginLeft:"300px",
    width:"calc(100%-30px)",
    height:"100%",
}

export default {
    middleCol: {
        width: "50%",
        borderRight: "2px solid " + defaultColor,
        height: "100%",
        display: "inline-block",
        padding: "15px",
        WebkitOverflowScrolling: "touch",
        "@media screen and (max-width: 800px)": {
            width: "100%",
        },    
    },
    rightCol: {
        width: "50%", 
        borderRight: "2px solid " + defaultColor,
        height: "100%",
        display: "inline-block",
        padding: "15px",
        WebkitOverflowScrolling: "touch",
    },
    grid: {
        leftbarOpen: [grid, {
            marginLeft: "300px",
        }],
        leftbarClosed: [grid, {
            marginLeft: "40px",
        }],
    },
    monthDisplay: {
        backgroundColor: defaultColor,
        zIndex: "87",
        position: "fixed",
        top: "40px",
        marginLeft: "-55px",
        fontSize: "19px",
        padding: "5px 10px",
        fontWeight: "400",
        maxWidth: "150px",
        boxShadow: "1px 1px 5px -3px black",
    },

}
