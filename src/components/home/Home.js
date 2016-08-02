import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";
import Navbar from "~/components/shared/navbar/Navbar"

let styles = {
    div: {
        marginTop: "60px",
    }
}

@Radium
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root pageName="home">
                <div style={styles.div}>
                    <Leftbar />
                    <Editor />
                    <AnnouncementsList />
                    <Navbar />
                </div>
            </Root>
        )
    }
}

pageInit(Home);
