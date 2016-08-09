import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";
import Navbar from "~/components/shared/navbar/Navbar"
import styles from "~/styles/home";

import { makeStore } from "~/util/redux";
import reducers from "~/reducers/home";
import { fetchAnnouncements } from "~/actions/home";
const store = makeStore(reducers);
store.dispatch(fetchAnnouncements());

@Radium
export default class Home extends React.Component {

    render() {
        return (
            <Root pageName="home" store={store}>
                <Navbar />
                <div style={styles.container}>
                    <Leftbar />
                    <div style={styles.centerCol}>
                        <Editor />
                        <AnnouncementsList />
                    </div>
                </div>
            </Root>
        )
    }
}

pageInit(Home);
