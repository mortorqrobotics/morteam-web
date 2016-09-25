import React from "react";
import Radium from "radium";

import styles from "~/login/styles/topBar";

@Radium
export default class TopBar extends React.Component {

    render() {
        return (
            <div style={styles.landingBox}>
                <h1 style={styles.h1}>MorTeam</h1>
                <h3 style={styles.h3}> Beta</h3>
            </div>
        )
    }

}
