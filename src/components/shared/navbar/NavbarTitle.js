import React from "react";
import Radium from "radium";

import styles from "~/styles/navbar";

@Radium
export default class NavbarTitle extends React.Component {

    onClick = () => {
        window.location.assign("/");
    }

    render() {
        return (
            <li onClick={this.onClick} style={styles.title}>MorTeam</li>
        )
    }
}
