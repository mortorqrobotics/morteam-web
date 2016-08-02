import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";
import Navbar from "../shared/navbar/Navbar";


let styles = {
    div: {
        marginTop: "60px",
    }
}

@Radium
export default class Index extends React.Component {
    render() {
        return (
            <Root>
                <div style={styles.div}>
                    <Navbar />
                    <Leftbar />
                    <Editor />
                    <AnnouncementsList />
                    
                </div>
            </Root>
        )
    }
}

pageInit(Index);
