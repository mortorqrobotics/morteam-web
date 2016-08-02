import React from "react";
import Radium from "radium";

let styles = {
    li: {
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
    }
}

@Radium
export default class NavbarTitle extends React.Component {

    onClick = () => {
        window.location.assign("/");
    }

    render() {
        return (
            <li onClick={this.onClick} style={styles.li}>MorTeam</li>
        )
    }
}
