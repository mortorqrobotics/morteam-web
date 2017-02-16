import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Leftbar from "./leftbar/Leftbar";
import Rightbar from "./rightbar/Rightbar";
import Navbar from "~/shared/components/navbar/Navbar";
import CenterContainer from "./CenterContainer";
import styles from "~/home/styles";

import { makeStore, soundsMiddleware } from "~/util/redux";
import reducers from "~/home/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initialActions } from "~/home/actions";
import { currentUser } from "~/util";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
export default class Home extends React.Component {

    render() {
        return (
            <Root pageName="home" store={store}>
                <Navbar />
                <div style={styles.container}>
                    <Leftbar />
                    <CenterContainer />
                    <Rightbar />
                </div>
            </Root>
        )
    }
}

pageInit(Home);
