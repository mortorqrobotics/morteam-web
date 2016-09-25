import React from "react";
import Radium from "radium";

import styles from "~/login/styles";

@Radium
export default class TopBar extends React.Component {

    render() {
        return (
            <div style={[styles.landingBox]}>
    			<h1 style={[styles.topBar.landingBoxh1h3, styles.topBarlandingBoxh1]}>MorTeam</h1><h3 style={[styles.topBar.landingBoxh1h3, styles.topBar.landingBoxh3]}> Beta</h3>
    		</div>
        )
    }

}
