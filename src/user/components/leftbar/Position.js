import React from "react";
import Radium from "radium";

import styles from "~/user/styles/leftbar";
import { capitalize } from "~/util";

@Radium
export default class Position extends React.Component {

    static props = {
        position: React.PropTypes.string,
    }

    render() {
        return (
            <div style={styles.item}>
                <span style={styles.positionIndicator}>
                    {capitalize(this.props.position)}
                </span>
            </div>
        )
    }

}
