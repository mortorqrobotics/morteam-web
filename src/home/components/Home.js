import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";
import Navbar from "~/shared/components/navbar/Navbar"
import styles from "~/home/styles";

import { makeStore } from "~/util/redux";
import reducers from "~/home/reducers";
const store = makeStore(reducers);
import { initialActions } from "~/home/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import { initListeners as initSharedListeners } from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));

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
