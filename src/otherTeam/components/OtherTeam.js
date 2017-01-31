import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Center from "./Center";

import { makeStore, soundsMiddleware } from "~/util/redux";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...sharedReducers,
}, soundsMiddleware());
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
export default class OtherTeam extends React.Component {

    render() {
        return (
            <Root pageName="chat" store={store}>
                <Navbar />
                <Center />
            </Root>
        )
    }

}

pageInit(OtherTeam);