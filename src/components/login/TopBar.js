import React from "react";
import Radium from "radium";

let styles = {
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
}

@Radium
export default class TopBar extends React.Component {

    render() {
        return (
            <div style={[styles.landingBox]}>
    			<h1 style={[styles.landingBoxh1h3, styles.landingBoxh1]}>MorTeam</h1><h3 style={[styles.landingBoxh1h3, styles.landingBoxh3]}> Beta</h3>
    		</div>
        )
    }

}
