import React from "react";
import Radium from "radium";

import styles from "~/home/styles/announcements";

@Radium
export default class AnnouncementsRight extends React.Component {
    render() {
        return (
            <div style={styles.right} />
        )
    }

}
