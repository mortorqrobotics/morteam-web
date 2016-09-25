export default {
    container: {
        "backgroundColor": "#fff",
        "color": "black",
    },
    box:{
        wrapper: {
        backgroundColor: "#FFC547",
        width: "260px",
        height: "auto",
        position: "fixed",
        right: "10px",
        textAlign: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
        top: "230px",
        fontFamily: "Arial",
        },
        fpLink: {
            fontSize: "14px",
            textDecoration: "underline",
            color: "-webkit-link",
        },
        rememberMeLabel: {
            fontWeight: "200",
            fontSize: "17px",
            textAlign: "left",
            float: "left",
            marginLeft: "10px",
        },
        errorMsg: {
            display: "inline-block",
            marginTop: "10px",
        },
        textBox:{
            fontSize: "18px",
            width: "210px",
            height: "28px",
            padding: "3px",
            border: "none",
            marginBottom: "15px",
            boxSizing: "unset",
        },
        signupButton:{
            backgroundColor: "#00A2FF",
            border: "0",
            borderRadius: "1px",
            fontSize: "18px",
            position: "relative",
            width: "210px",
            height: "32px",
            padding: "5px",
            ":hover": {
                backgroundColor: "#008BDB",
            }
        },
        loginButton: {
            backgroundColor: "orange",
            border: "0",
            borderRadius: "1px",
            fontSize: "18px",
            position: "relative",
            width: "210px",
            height: "32px",
            padding: "5px",
            ":hover": {
                backgroundColor: "darkorange",
            },
        },
    },
    textArea:{
        introText: {
            fontFamily: "'helvetica neue', sans-serif",
            width: "calc(100% - 490px)",
            textAlign: "justify",
            paddingTop: "100px",
            paddingLeft: "100px",
            paddingRight: "100px",
            boxSizing: "unset",
        },
        landingBoxMain: {
            maxWidth: "800px",
            margin: "auto",
        },
        title: {
            fontSize: "40px",
            marginBottom: "25px",
            fontWeight: "400",
            maxWidth: "800px",
        },
        text: {
            maxWidth: "800px",
            marginBottom: "85px",
            fontWeight: "200",
            fontSize: "24px",
            lineHeight: "32.5px",
        },
    },
    topBar:{
        landingBox: {
            backgroundColor: "#FFC547",
            paddingTop: "30px",
            height: "80px",
            width: "100%",
            boxSizing: "unset"
        },
        landingBoxh1h3: {
            display: "inline-block",
            color: "white",
            fontWeight: "200",
            fontFamily: "'exo 2', sans-serif",
        },
        landingBoxh1: {
            fontSize: "60px",
            paddingLeft: "30px",
            margin: "0px",
        },
        landingBoxh3: {
            fontSize: "16px",
            paddingLeft: "10px",
        },
    },
}