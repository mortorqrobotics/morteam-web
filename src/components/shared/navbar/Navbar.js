import React from "react";
import Radium from "radium";

import NavbarList from "./NavbarList";

let styles = {
    div: {
        backgroundColor: "#FFC547",
        height: "40px",
        position: "fixed",
        width: "100%",
        top: "0",
        boxShadow: "1px 1px 12px -7px black",
        zIndex: "89",
        borderRadius: "1px",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
    }
}

@Radium
export default class Navbar extends React.Component {

    render() {
        return (
            <div style={styles.div}>
                <NavbarList />
            </div>
        )
    }
}
