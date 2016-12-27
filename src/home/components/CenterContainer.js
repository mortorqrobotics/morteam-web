import React from "react";
import Radium from "radium";

import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";
import styles from "~/home/styles/index";

@Radium
export default class CenterContainer extends React.Component {
    render() {
        return (
            <div style={styles.centerCol}>
                <Editor />
                <AnnouncementsList />
            </div>
        )
    }

}
