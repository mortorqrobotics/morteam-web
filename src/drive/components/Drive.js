import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/drive/components/Leftbar";
import Middle from "~/drive/components/Middle";

import { makeStore, soundsMiddleware } from "~/util/redux";
import reducers from "~/drive/reducers";
import sharedReducers from "~/shared/reducers";
import { fetchFolders } from "~/drive/actions";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initialActions } from "~/drive/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
class Drive extends React.Component {

    render() {
        return (
            <Root pageName="drive" store={store}>
                <Navbar />
                <Leftbar />
                <Middle />
            </Root>
        )
    }

}

pageInit(Drive);
