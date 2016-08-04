const navbarHeight = 40;

export default {
    container: {
        backgroundColor: "#FFC547",
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
    },
    searchDropItem: {
        li: {
            listStyle: "none",
            height: "auto",
            fontSize: "16px",
            padding: "5px",
            cursor: "pointer",
            borderBottom: "1px solid #c9c9c9",
            //TODO: fix styling
            ":hover": {
                backgroundColor: "#ffcc80",
            }
        },
        span: {
            verticalAlign: "middle",
        },
        img: {
            width: "30px",
            height: "30px",
            objectFit: "cover",
            borderRadius: "5px",
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
                backgroundColor: "#FFB524",
                cursor: "pointer",
            },
            "@media screen and (max-width: 820px)": {
                display: "none",
            },
        },
        glyph: {
            position: "relative",
            top: "1px",
            display: "inline-block",
            fontFamily: "'Glyphicons Halflings'",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "1",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
        },
    },
    profileDropdown: {
        div: {
            position: "absolute",
            top: "10px",
            right: "0px",
            height: navbarHeight + "px",
            marginRight: "20px",
            cursor: "pointer",
        },
        profPic: {
            width: "30px",
            height: "30px",
            objectFit: "cover",
            borderRadius: "5px",
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
                backgroundColor: "#ffc547",
                border: "none",
                borderRadius: "0",
                padding: "0",
                fontFamily: "'exo 2', sans-serif",
                fontWeight: "200",
                overflow: "hidden",
            },
            li: {
                marginLeft: "-40px",
                userSelect: "none",
                listStyleType: "none",
                height: "auto",
                borderBottom: "1px solid black",
                fontSize: "14px",
                textAlign: "left",
                padding: "10px",
                ":hover": {
                    backgroundColor: "#ffb524",
                    cursor: "pointer",
                },
            },
        },
    },
}
