import React from "react";
import Radium from "radium";

import Navbar from "~/shared/components/navbar/Navbar";
import Heading from "~/team/components/Heading";
import Middle from "~/team/components/Middle";
import Root, { pageInit } from "~/shared/components/Root";
import styles from "~/team/styles";
import { currentUser } from "~/util";

import { makeStore, soundsMiddleware } from "~/util/redux";
import reducers from "~/team/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initialActions } from "~/team/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
export default class Team extends React.Component {

    render() {
        return (
            <Root pageName="team" store={store}>
                <Navbar />
                <div style={styles.wideBody}>
                    <Heading />
                    <Middle />
                </div>
            </Root>
        )
    }
}

pageInit(Team);
