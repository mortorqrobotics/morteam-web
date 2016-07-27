import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";

let styles = {
    div: {
        marginTop: "60px",
    }
}

@Radium
export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <div style={styles.div}>
                    <Leftbar />
                    <Editor />
                    <AnnouncementsList />
                </div>
            </Root>
        )
    }
}

pageInit(Index);
