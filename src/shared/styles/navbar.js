import { defaultColor, hoverColor, selectedColor } from "~/shared/styles/colors";

const navbarHeight = 40;

export default {
    container: {
        backgroundColor: defaultColor,
        height: navbarHeight + "px",
        position: "fixed",
        width: "100%",
        top: "0",
        boxShadow: "1px 1px 12px -7px black",
        zIndex: "89",
        borderRadius: "1px",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
    },
    ul: {
        height: "100%",
        padding: "0",
    },
    title: {
        fontSize: "18px",
        marginLeft: "18px",
        marginRight: "12px",
        fontFamily: "'Titillium Web', sans-serif",
        cursor: "pointer",
        display: "inline-block",
        "@media screen and (max-width: 700px)": {
            marginLeft: "10px",
            marginRight: "4px",
        },
        "@media screen and (max-width: 490px)": {
            marginLeft: "6px",
            marginRight: "0px",
        },
        "@media screen and (max-width: 330px)": {
            marginTop: "8.5px",
            display: "none",
        },
    },
    link: {
        color: "black",
        textDecoration: "none",
    },
    search: {
        li: {
            width: "360px",
            margin: "0px 10px 0px 2px",
            position: "relative",
            display: "inline-block",
            "@media screen and (max-width: 700px)": {
                width: "55% ",
            },
            "@media screen and (max-width: 490px)": {
                width: "41% ",
            },
            "@media screen and (max-width: 330px)": {
                width: "60% ",
            },
            "@media screen and (max-width: 295px)": {
                width: "50% ",
            },
        },
        textBox: {
            border: "0",
            height: "34px",
            width: "100%",
            position: "relative",
            fontSize: "20px",
            padding: "8px",
            marginTop: "3px",
            borderRadius: "5px",
        },
    },
    searchDrop: {
        display: "block",
        position: "absolute",
        width: "100%",
        height: "auto",
        backgroundColor: "white",
        zIndex: "300",
        boxShadow: "1px 1px 12px -7px black",
        border: "1px solid #c9c9c9",
    },
    searchDropItem: {
        li: {
            marginLeft: "-40px",
            listStyle: "none",
            height: "auto",
            fontSize: "16px",
            padding: "5px",
            cursor: "pointer",
            borderBottom: "1px solid #c9c9c9",
            ":hover": {
                backgroundColor: "#ffcc80",
            }
        },
        span: {
            paddingLeft: "10px",
            verticalAlign: "middle",
        },
    },
    glyphLink: {
        li: {
            textAlign: "center",
            display: "inline-block",
            width: "35px",
            fontSize: "20px",
            height: "100%",
            paddingTop: "8px",
            position: "relative",
            marginLeft: "0px 2px 0px -5px",
            ":hover": {
                cursor: "pointer",
            },
            "@media screen and (max-width: 820px)": {
                display: "none",
            },
        },
        selected: {
            backgroundColor: selectedColor,
            ":hover": {
                backgroundColor: "darkorange",
            },
        },
        unselected: {    
            ":hover": {
                backgroundColor: hoverColor,
            },
        }
    },
    rightLinks: {
        container:{    
            position: "absolute",
            top: "10px",
            right: "0px",
            height: navbarHeight + "px",
            marginRight: "20px",
            cursor: "pointer",
        },
    },
    profileDropdown: {
        profPic: {
            position: "relative",
            marginTop: "-5px",
            marginRight: "15px",
            display: "inline-block",
        },
        name: {
            position: "relative",
            verticalAlign: "text-bottom",
            marginLeft: "10px",
            marginRight: "15px",
            display: "inline-block",
        },
        modal: {
            container: {
                position: "fixed",
                width: "240px",
                top: (navbarHeight + 5) + "px",
                right: "5px",
                left: "auto",
                height: "80px",
                backgroundColor: defaultColor,
                borderRadius: "0",
                padding: "0",
                fontFamily: "'exo 2', sans-serif",
                fontWeight: "200",
                overflow: "hidden",
                outline: "none",
            },
            li: {
                userSelect: "none",
                listStyleType: "none",
                height: "auto",
                borderBottom: "1px solid black",
                fontSize: "14px",
                textAlign: "left",
                padding: "10px",
                width: "240px",
                marginLeft: "-40px",
                ":hover": {
                    backgroundColor: hoverColor,
                    cursor: "pointer",
                },
            },
        },
    },
    navbarDropdown: {
        div: {
            width: "100%",
            textAlign: "center",
            backgroundColor: defaultColor,
            left: "0px",
            top: "40px",
            height: "auto",
            padding: "10px 0 5px 0",
            zIndex: "88",
            boxShadow: "0 3px 8px -5px black",
            position: "fixed",
        "@media screen and (min-width: 821px)": {
                display: "none",
            },
        },
        item: {
            fontWeight: "300",
            width: "100%",
            lineHeight: "40px",
            cursor: "pointer",
            margin: "0px",
            ":hover": {
                backgroundColor: selectedColor,
            },
        },
        li: {
            textAlign: "center",
            display: "inline-block",
            width: "35px",
            fontSize: "20px",
            height: navbarHeight + "px",
            paddingTop: "8px",
            position: "relative",
            marginTop: "-10px",
            marginRight: "5px",
            ":hover": {
                backgroundColor: hoverColor,
                cursor: "pointer",
            },
            "@media screen and (min-width: 821px)": {
                display: "none",
            }
        }
    },
}
