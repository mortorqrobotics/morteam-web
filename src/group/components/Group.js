import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Middle from "~/group/components/Middle";
import styles from "~/shared/styles/userList";
import Navbar from "~/shared/components/navbar/Navbar";
import Heading from "~/group/components/Heading";

import { makeStore, soundsMiddleware } from "~/util/redux";
import reducers from "~/group/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initialActions } from "~/group/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
class Group extends React.Component {

    render() {
        return (
            <Root pageName="group" store={store}>
                <Navbar />
                <Heading />
                <Middle />
            </Root>
        )
    }
}

pageInit(Group);
